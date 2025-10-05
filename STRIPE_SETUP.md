# 💳 Stripe Payment Integration Setup

## 🚀 Quick Setup (15 minutes)

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Click "Start now"
3. Create account with your business details
4. Verify your email

### Step 2: Get Your API Keys

#### Test Mode (Development)
1. Dashboard → Developers → API keys
2. Copy these for testing:
   ```
   Publishable key: pk_test_51...
   Secret key: sk_test_51...
   ```

#### Live Mode (Production)
1. Complete account activation first
2. Toggle to "Live mode" in dashboard
3. Get production keys:
   ```
   Publishable key: pk_live_51...
   Secret key: sk_live_51...
   ```

---

## 📦 Create Products & Pricing in Stripe

### Step 1: Access Product Catalog
1. Go to: https://dashboard.stripe.com/products
2. Click **"+ Add product"**

### Step 2: Create Starter Plan

#### Product Details:
```
Name: Starter Plan
Description: Perfect for small businesses getting started with AI automation
```

#### Pricing:
Click **"Add another price"** for each:

**Monthly Price:**
```
Price: $299.00
Billing period: Monthly
Price ID: price_starter_monthly
```

**Yearly Price:**
```
Price: $2,990.00
Billing period: Yearly
Price ID: price_starter_yearly
Save: $598 (2 months free!)
```

### Step 3: Create Professional Plan

#### Product Details:
```
Name: Professional Plan
Description: Ideal for growing companies ready to scale with AI
```

#### Pricing:

**Monthly Price:**
```
Price: $799.00
Billing period: Monthly
Price ID: price_professional_monthly
```

**Yearly Price:**
```
Price: $7,990.00
Billing period: Yearly
Price ID: price_professional_yearly
Save: $1,598 (2 months free!)
```

### Step 4: Note Your Price IDs
After creating, Stripe generates IDs like:
- `price_1ABcDeFgHiJkLmNo` (Starter Monthly)
- `price_2ABcDeFgHiJkLmNo` (Starter Yearly)
- `price_3ABcDeFgHiJkLmNo` (Professional Monthly)
- `price_4ABcDeFgHiJkLmNo` (Professional Yearly)

---

## 🔧 Configure Your Application

### Step 1: Update Environment Variables

Add to your `.env` file:
```env
# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_live_YOUR_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Price IDs from Stripe Dashboard
STRIPE_PRICE_STARTER_MONTHLY=price_1ABcDeFgHiJkLmNo
STRIPE_PRICE_STARTER_YEARLY=price_2ABcDeFgHiJkLmNo
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_3ABcDeFgHiJkLmNo
STRIPE_PRICE_PROFESSIONAL_YEARLY=price_4ABcDeFgHiJkLmNo

# Supabase Service Role (for webhooks)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### Step 2: Get Supabase Service Role Key
1. Go to: https://supabase.com/dashboard/project/ilvefyyasocmotxfzigg/settings/api
2. Find "Service role key" (keep this SECRET!)
3. Add to environment variables

### Step 3: Update stripe.js with Price IDs

```javascript
// src/lib/stripe.js
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    priceMonthly: 299,
    priceYearly: 2990,
    stripePriceIdMonthly: 'price_1ABcDeFgHiJkLmNo',
    stripePriceIdYearly: 'price_2ABcDeFgHiJkLmNo',
  },
  professional: {
    name: 'Professional',
    priceMonthly: 799,
    priceYearly: 7990,
    stripePriceIdMonthly: 'price_3ABcDeFgHiJkLmNo',
    stripePriceIdYearly: 'price_4ABcDeFgHiJkLmNo',
  },
};
```

---

## 🔗 Setup Webhooks

### Step 1: Add Webhook Endpoint
1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Enter endpoint URL:
   ```
   https://growthmindset.ai/.netlify/functions/stripe-webhook
   ```
   Or for Vercel:
   ```
   https://growthmindset.ai/api/stripe-webhook
   ```

### Step 2: Select Events to Listen
Select these events:
- `checkout.session.completed` ✓
- `customer.subscription.created` ✓
- `customer.subscription.updated` ✓
- `customer.subscription.deleted` ✓
- `invoice.payment_succeeded` ✓
- `invoice.payment_failed` ✓

### Step 3: Get Webhook Secret
After creating, copy the "Signing secret":
```
whsec_1234567890abcdef...
```
Add this to your `.env` as `STRIPE_WEBHOOK_SECRET`

---

## 💻 Install Stripe Dependencies

```bash
# Install Stripe packages
npm install @stripe/stripe-js stripe

# For the webhook handler
npm install --save-dev @types/stripe
```

---

## 🧪 Test Your Integration

### Step 1: Test Mode Setup
1. Use test API keys first
2. Create test products with same structure
3. Use test credit cards:
   ```
   Success: 4242 4242 4242 4242
   Decline: 4000 0000 0000 0002
   3D Secure: 4000 0025 0000 3155
   ```

### Step 2: Test Checkout Flow
```javascript
// Test in your browser console
import { createCheckoutSession } from './src/lib/stripe';

// Test checkout
await createCheckoutSession('starter', 'monthly');
```

### Step 3: Test Webhooks Locally
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook

# Trigger test events
stripe trigger checkout.session.completed
```

---

## 📊 Stripe Dashboard Configuration

### Payment Methods
1. Go to: Settings → Payment methods
2. Enable:
   - Cards ✓
   - Google Pay ✓
   - Apple Pay ✓
   - Link ✓

### Customer Portal
1. Go to: Settings → Billing → Customer portal
2. Enable features:
   - Update payment methods ✓
   - Cancel subscriptions ✓
   - View invoices ✓
   - Update billing address ✓

### Email Receipts
1. Go to: Settings → Emails
2. Customize receipt emails
3. Add your logo and brand colors

### Tax Settings (Optional)
1. Go to: Settings → Tax
2. Enable Stripe Tax if needed
3. Configure tax rates by region

---

## 🚀 Go Live Checklist

### Before Going Live:
- [ ] Complete Stripe account activation
- [ ] Add bank account for payouts
- [ ] Verify business details
- [ ] Set up 2FA for security
- [ ] Configure fraud prevention rules

### Switch to Production:
- [ ] Replace test API keys with live keys
- [ ] Update webhook endpoint to production URL
- [ ] Create production products and prices
- [ ] Update price IDs in code
- [ ] Test with real credit card (small amount)

### After Going Live:
- [ ] Monitor first transactions
- [ ] Check webhook logs
- [ ] Verify Supabase updates
- [ ] Set up Stripe Radar (fraud prevention)
- [ ] Configure payout schedule

---

## 🔒 Security Best Practices

### API Keys
- **Never** commit secret keys to Git
- Use environment variables only
- Rotate keys periodically
- Use restricted keys for specific operations

### Webhook Security
- Always verify webhook signatures
- Use HTTPS endpoints only
- Implement idempotency
- Log all webhook events

### PCI Compliance
- Never store card details
- Use Stripe Checkout (hosted)
- Enable 3D Secure for EU cards
- Regular security reviews

---

## 📈 Analytics & Reporting

### Stripe Dashboard
- Revenue analytics
- Subscription metrics
- Churn analysis
- Payment success rates

### Custom Metrics in Supabase
```sql
-- Monthly Recurring Revenue (MRR)
SELECT 
  SUM(CASE 
    WHEN plan_id = 'starter' THEN 299
    WHEN plan_id = 'professional' THEN 799
    ELSE 0
  END) as mrr
FROM subscriptions
WHERE status = 'active';

-- Active Subscriptions by Plan
SELECT 
  plan_id,
  COUNT(*) as count
FROM subscriptions
WHERE status = 'active'
GROUP BY plan_id;
```

---

## 🆘 Common Issues & Solutions

### "No such price" Error
- Verify price IDs match exactly
- Check if using test vs live keys consistently

### Webhook Not Receiving Events
- Verify endpoint URL is correct
- Check webhook secret matches
- Ensure function is deployed

### Customer Can't Access Portal
- Enable customer portal in Stripe
- Pass correct return URL
- Verify customer has Stripe ID

### Subscription Not Updating in Database
- Check webhook logs in Stripe
- Verify Supabase service key
- Check RLS policies

---

## 📞 Support Resources

### Stripe Support
- Docs: https://stripe.com/docs
- Discord: https://discord.gg/stripe
- Support: https://support.stripe.com

### Testing Resources
- Test cards: https://stripe.com/docs/testing
- API reference: https://stripe.com/docs/api
- Stripe CLI: https://stripe.com/docs/stripe-cli

---

## 💰 Fee Structure

### Stripe Pricing (US)
- **Standard**: 2.9% + $0.30 per transaction
- **International cards**: +1%
- **Currency conversion**: +1%
- **No monthly fees**
- **No setup fees**

### Volume Discounts
Contact Stripe for custom pricing if processing >$50k/month

---

## 🎯 Next Steps

1. **Create Stripe Account** ✓
2. **Set up products & prices** ✓
3. **Configure webhooks** ✓
4. **Test in development** ✓
5. **Go live** → Ready!

Your payment system will be fully operational! 💳
