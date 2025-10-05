-- Growth Mindset AI - Supabase Database Setup
-- Run this entire script in your Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/ilvefyyasocmotxfzigg/sql

-- ==========================================
-- 1. ENABLE REQUIRED EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 2. CREATE PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'trialing',
  trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ==========================================
-- 3. CREATE SERVICES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('voice_ai', 'recruitment', 'payroll', 'call_center', 'content_marketing')),
  service_name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  config JSONB DEFAULT '{}'::jsonb,
  usage_limit INTEGER DEFAULT 100,
  usage_current INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own services" ON public.services
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own services" ON public.services
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own services" ON public.services
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own services" ON public.services
  FOR DELETE USING (auth.uid() = user_id);

-- ==========================================
-- 4. CREATE ACTIVITY_LOGS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own activity" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own activity" ON public.activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 5. CREATE SUBSCRIPTIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'trialing',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================
-- 6. CREATE METRICS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL DEFAULT 0,
  period_start DATE NOT NULL DEFAULT CURRENT_DATE,
  period_end DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own metrics" ON public.metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can create metrics" ON public.metrics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.services 
      WHERE services.id = service_id 
      AND services.user_id = auth.uid()
    )
  );

-- ==========================================
-- 7. CREATE FUNCTIONS
-- ==========================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  
  -- Log the signup
  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (
    new.id,
    'user.signup',
    jsonb_build_object(
      'email', new.email,
      'provider', new.raw_user_meta_data->>'provider'
    )
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Function to get user metrics summary
CREATE OR REPLACE FUNCTION public.get_user_metrics_summary(user_uuid UUID)
RETURNS TABLE (
  total_calls BIGINT,
  total_leads BIGINT,
  total_revenue NUMERIC,
  active_services BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(CASE WHEN m.metric_type = 'calls' THEN m.metric_value ELSE 0 END)::BIGINT, 0) as total_calls,
    COALESCE(SUM(CASE WHEN m.metric_type = 'leads' THEN m.metric_value ELSE 0 END)::BIGINT, 0) as total_leads,
    COALESCE(SUM(CASE WHEN m.metric_type = 'revenue' THEN m.metric_value ELSE 0 END), 0) as total_revenue,
    COALESCE(COUNT(DISTINCT s.id)::BIGINT, 0) as active_services
  FROM public.metrics m
  LEFT JOIN public.services s ON s.user_id = user_uuid AND s.status = 'active'
  WHERE m.user_id = user_uuid
    AND m.period_start >= CURRENT_DATE - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- 8. CREATE TRIGGERS
-- ==========================================

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================
-- 9. CREATE INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_services_user_id ON public.services(user_id);
CREATE INDEX IF NOT EXISTS idx_services_status ON public.services(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_user_id ON public.metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_metrics_period ON public.metrics(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);

-- ==========================================
-- 10. INSERT DEMO DATA (Optional)
-- ==========================================
-- Uncomment to create a demo account with sample data

/*
-- Create demo user (password: demo123456)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'demo@growthmindset.ai',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  '{"full_name": "Demo User", "company_name": "Demo Company"}'::jsonb
);

-- Create demo services
INSERT INTO public.services (user_id, service_type, service_name, config) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'voice_ai', 'AI Receptionist', '{"phone_number": "+1-555-0100", "greeting": "Welcome to Demo Company"}'::jsonb),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'recruitment', 'Smart Hiring', '{"positions": ["Developer", "Designer"], "auto_screen": true}'::jsonb);

-- Add demo metrics
INSERT INTO public.metrics (user_id, metric_type, metric_value) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'calls', 150),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'leads', 25),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'revenue', 5000);
*/

-- ==========================================
-- 11. GRANT PERMISSIONS
-- ==========================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ==========================================
-- SUCCESS MESSAGE
-- ==========================================
DO $$
BEGIN
  RAISE NOTICE '✅ Growth Mindset AI database setup complete!';
  RAISE NOTICE '📊 Tables created: profiles, services, activity_logs, subscriptions, metrics';
  RAISE NOTICE '🔒 Row Level Security enabled on all tables';
  RAISE NOTICE '⚡ Functions and triggers configured';
  RAISE NOTICE '🚀 Your database is ready for production!';
END $$;
