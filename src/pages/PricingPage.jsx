// src/pages/PricingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Star, TrendingUp, Sparkles, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses getting started with AI automation',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        { name: 'Voice AI Agent (100 calls/month)', included: true },
        { name: 'Basic Recruitment Screening', included: true },
        { name: 'Email Support', included: true },
        { name: 'API Access', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Custom Integrations', included: false },
        { name: 'Priority Support', included: false },
        { name: 'White Label Options', included: false },
      ],
      cta: 'Schedule Guided Tour',
      highlighted: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing companies ready to scale with AI',
      monthlyPrice: 799,
      yearlyPrice: 7990,
      badge: 'Most Popular',
      features: [
        { name: 'Voice AI Agents (500 calls/month)', included: true },
        { name: 'Full Recruitment Suite', included: true },
        { name: 'Financial Automation', included: true },
        { name: 'Content Marketing AI', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Priority Support', included: true },
        { name: 'White Label Options', included: false },
      ],
      cta: 'Schedule Guided Tour',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for large organizations',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      badge: 'Best Value',
      features: [
        { name: 'Unlimited Voice AI Calls', included: true },
        { name: 'All AI Services Included', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'Custom AI Model Training', included: true },
        { name: 'Enterprise Analytics', included: true },
        { name: 'Unlimited Integrations', included: true },
        { name: '24/7 Phone Support', included: true },
        { name: 'Full White Label Suite', included: true },
      ],
      cta: 'Contact Sales',
      highlighted: false,
      isCustom: true,
    },
  ];

  const handleSelectPlan = (plan) => {
    if (plan.id === 'enterprise') {
      navigate('/contact?plan=enterprise');
    } else if (user) {
      // If user is logged in, go to checkout
      navigate(`/checkout?plan=${plan.id}&billing=${billingCycle}`);
    } else {
      // If not logged in, go to signup with plan info
      navigate(`/signup?plan=${plan.id}&billing=${billingCycle}`);
    }
  };

  const calculateSavings = (monthlyPrice) => {
    if (typeof monthlyPrice === 'number') {
      const yearlyTotal = monthlyPrice * 12;
      const discountedYearly = monthlyPrice * 10; // 2 months free
      return yearlyTotal - discountedYearly;
    }
    return 0;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 px-4 py-1 text-sm">
          <Sparkles className="w-3 h-3 mr-1" />
          Expert-guided platform setup
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your business. Scale up or down anytime.
        </p>
      </motion.div>

      {/* Billing Toggle - Simple Button Version */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center bg-card border border-border rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-colors",
              billingCycle === 'monthly' 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-colors relative",
              billingCycle === 'yearly' 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <Badge className="absolute -top-8 -right-2 bg-green-500 text-white text-xs">
              Save 17%
            </Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative h-full"
          >
            <Card className={cn(
              "h-full flex flex-col",
              plan.highlighted && "border-accent shadow-2xl shadow-accent/20"
            )}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 bg-accent text-accent-foreground">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  {typeof plan.monthlyPrice === 'number' ? (
                    <>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                        </span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-green-500 mt-2">
                          Save ${calculateSavings(plan.monthlyPrice)} yearly
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-4xl font-bold">Custom</div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/30 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        !feature.included && "text-muted-foreground/50"
                      )}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-6 pb-4 flex flex-col gap-3">
                <Button 
                  className="w-full" 
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Schedule Guided Tour
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                {plan.id === 'enterprise' ? (
                  <Button 
                    className="w-full bg-warning hover:bg-warning/90 text-warning-foreground" 
                    size="lg"
                    onClick={() => navigate('/contact?plan=enterprise')}
                  >
                    Contact Sales
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-warning hover:bg-warning/90 text-warning-foreground" 
                    size="lg"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Buy Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">Instant Setup</h3>
              <p className="text-sm text-muted-foreground">Get started in under 5 minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">No Hidden Fees</h3>
              <p className="text-sm text-muted-foreground">What you see is what you pay</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">Scale Anytime</h3>
              <p className="text-sm text-muted-foreground">Upgrade or downgrade instantly</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Can I change plans later?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, debit cards, and ACH transfers for Enterprise plans.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
            <p className="text-sm text-muted-foreground">
              No, there are no setup fees. You only pay the monthly or yearly subscription fee.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-20 text-center"
      >
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-accent/10 to-warning/10 border-0">
          <CardContent className="py-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 10,000+ businesses already using AI to scale operations
            </p>
            <Button size="lg" onClick={() => navigate('/signup')} className="px-8">
              Schedule Guided Tour
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Personalized demo • Expert consultation • See it in action
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PricingPage;
