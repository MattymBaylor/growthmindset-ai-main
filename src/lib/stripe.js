// src/lib/stripe.js
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

// Initialize Stripe (we'll add your public key when you have it)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

// Pricing configuration (matches PricingPage.jsx)
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    priceMonthly: 299,
    priceYearly: 2990,
    stripePriceIdMonthly: '', // Will add your Stripe price IDs
    stripePriceIdYearly: '',
  },
  professional: {
    name: 'Professional',
    priceMonthly: 799,
    priceYearly: 7990,
    stripePriceIdMonthly: '',
    stripePriceIdYearly: '',
  },
  enterprise: {
    name: 'Enterprise',
    custom: true,
  },
};

// Create Stripe checkout session
export async function createCheckoutSession(planId, billingCycle = 'monthly') {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in to subscribe');
    }
    
    // Call your backend API to create checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        billingCycle,
        userId: user.id,
        userEmail: user.email,
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
      }),
    });
    
    const { sessionId, error } = await response.json();
    
    if (error) {
      throw new Error(error);
    }
    
    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId,
    });
    
    if (stripeError) {
      throw stripeError;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Create Stripe customer portal session for subscription management
export async function createCustomerPortalSession() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in');
    }
    
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        returnUrl: `${window.location.origin}/dashboard`,
      }),
    });
    
    const { url, error } = await response.json();
    
    if (error) {
      throw new Error(error);
    }
    
    // Redirect to Stripe Customer Portal
    window.location.href = url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

// Get user's subscription status
export async function getSubscriptionStatus() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error);
      return null;
    }
    
    return subscription;
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}

// Check if user has access to a feature based on their plan
export function hasFeatureAccess(subscription, feature) {
  if (!subscription || subscription.status !== 'active') {
    return false;
  }
  
  const planFeatures = {
    starter: [
      'voice_ai_basic',
      'recruitment_basic',
      'email_support',
      'basic_analytics',
    ],
    professional: [
      'voice_ai_basic',
      'voice_ai_advanced',
      'recruitment_basic',
      'recruitment_advanced',
      'financial_automation',
      'content_marketing',
      'email_support',
      'priority_support',
      'basic_analytics',
      'advanced_analytics',
      'custom_integrations',
    ],
    enterprise: [
      'all_features',
    ],
  };
  
  const userFeatures = planFeatures[subscription.plan_id] || [];
  
  if (userFeatures.includes('all_features')) {
    return true;
  }
  
  return userFeatures.includes(feature);
}

// Format price for display
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount / 100);
}

// Handle successful payment (called from success page)
export async function handlePaymentSuccess(sessionId) {
  try {
    // Verify the session with your backend
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });
    
    const { success, subscription } = await response.json();
    
    if (success && subscription) {
      // Update local subscription data
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Update user's subscription in Supabase
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: user.id,
            ...subscription,
          });
        
        if (error) {
          console.error('Error updating subscription:', error);
        }
      }
    }
    
    return success;
  } catch (error) {
    console.error('Error handling payment success:', error);
    return false;
  }
}

// Cancel subscription
export async function cancelSubscription() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in');
    }
    
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    });
    
    const { success, error } = await response.json();
    
    if (error) {
      throw new Error(error);
    }
    
    return success;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

// Resume subscription
export async function resumeSubscription() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in');
    }
    
    const response = await fetch('/api/resume-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    });
    
    const { success, error } = await response.json();
    
    if (error) {
      throw new Error(error);
    }
    
    return success;
  } catch (error) {
    console.error('Error resuming subscription:', error);
    throw error;
  }
}

export default stripePromise;
