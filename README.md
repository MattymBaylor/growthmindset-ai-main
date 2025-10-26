# Growth Mindset AI - Business Automation Platform

A comprehensive AI-powered business automation platform built with React, Vite, and Supabase. 

## 🚀 Features

- **Voice AI Agents** - 24/7 AI receptionists and call handlers
- **AI Recruitment System** - Automated screening and interview systems
- **Financial Automation** - AI-powered payroll and accounting
- **Call Center & Leads** - Intelligent call distribution and lead management
- **Content Marketing AI** - Automated social media and content creation
- **User Authentication** - Secure authentication with Supabase
- **Real-time Updates** - Live data synchronization
- **Responsive Design** - Mobile-first, dark theme interface

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/growthmindset-ai.git
cd growthmindset-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from the project settings
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users profile table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own services" ON services
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own services" ON services
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own services" ON services
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own services" ON services
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5. Create Demo Account (Optional)

In Supabase Dashboard, create a demo user:
- Email: `demo@growthmindset.ai`
- Password: `demo123456`

### 6. Project Structure

```
growthmindset-ai/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── contexts/        # React contexts (Auth, etc.)
│   ├── lib/             # Utilities and Supabase client
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Images, fonts, etc.
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env.example         # Environment variables template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── index.html           # HTML template
```

### 7. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The production build will be in the `dist` folder.

## 🚀 Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Tech Stack

- **Frontend:** React 18, React Router v6
- **Styling:** Tailwind CSS, Radix UI
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **Build Tool:** Vite
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📚 Key Dependencies

- `@supabase/supabase-js` - Supabase client
- `react-router-dom` - Routing
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Headless UI components
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-hook-form` - Form management
- `zod` - Schema validation

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication with Supabase Auth
- Environment variables for sensitive data
- HTTPS enforced in production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For support, email support@growthmindset.ai or visit our [help center](https://growthmindset.ai/help).

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Radix UI](https://radix-ui.com) for accessible components
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for icons

---

Built with ❤️ by Growth Mindset AI Team
