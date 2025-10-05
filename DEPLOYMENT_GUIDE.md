# 🚀 Deployment & DNS Setup Guide for growthmindset.ai

## 📋 Prerequisites Checklist

- [x] GitHub repository created
- [ ] Supabase project configured
- [ ] Domain name (growthmindset.ai) registered
- [ ] DNS management access
- [ ] Vercel/Netlify account created
- [ ] Stripe account (for payments)

## 🔄 GitHub Repository Setup

### 1. Push to GitHub
```bash
# Initialize and configure git
cd growthmindset-ai
git add .
git commit -m "Initial commit: Growth Mindset AI platform"

# Create repository on GitHub (via CLI)
gh repo create growthmindset-ai --public --source=. --remote=origin

# Or manually add remote
git remote add origin https://github.com/YOUR_USERNAME/growthmindset-ai.git
git branch -M main
git push -u origin main
```

### 2. Configure Repository Secrets
Go to GitHub → Settings → Secrets and add:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

## 🌐 DNS Configuration

### Option A: Vercel Deployment (Recommended)

#### 1. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Follow prompts to link to your GitHub repo
```

#### 2. Configure Custom Domain in Vercel
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `growthmindset.ai` and `www.growthmindset.ai`
3. Vercel will provide DNS records

#### 3. Update DNS Records
Add these records to your domain registrar:

**For Root Domain (growthmindset.ai):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For SSL Certificate Validation:**
```
Type: CNAME
Name: _acme-challenge
Value: [provided by Vercel]
```

### Option B: Netlify Deployment

#### 1. Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Or use drag-and-drop at app.netlify.com
```

#### 2. Configure Custom Domain in Netlify
1. Go to Netlify Dashboard → Domain Settings
2. Add custom domain: `growthmindset.ai`
3. Choose primary domain (with or without www)

#### 3. Update DNS Records
**Option 1: Use Netlify DNS (Recommended)**
```
Change nameservers at your registrar to:
- dns1.p01.nsone.net
- dns2.p01.nsone.net
- dns3.p01.nsone.net
- dns4.p01.nsone.net
```

**Option 2: Keep Current DNS Provider**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site].netlify.app
```

## 🔒 SSL Certificate Setup

### Vercel
- SSL certificates are automatically provisioned
- Force HTTPS in vercel.json (already configured)

### Netlify
- SSL certificates via Let's Encrypt (automatic)
- Force HTTPS in netlify.toml (already configured)

## 📧 Email Configuration (MX Records)

Add these for professional email:
```
Type: MX
Priority: 1
Value: aspmx.l.google.com

Type: MX
Priority: 5
Value: alt1.aspmx.l.google.com

Type: MX
Priority: 5
Value: alt2.aspmx.l.google.com

Type: TXT
Name: @
Value: "v=spf1 include:_spf.google.com ~all"
```

## 🚦 Environment Variables

### Production Environment Variables
Create `.env.production`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
VITE_GA_TRACKING_ID=G-XXXXXXXX
VITE_APP_URL=https://growthmindset.ai
```

### Add to Deployment Platform
**Vercel:**
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_STRIPE_PUBLIC_KEY
```

**Netlify:**
```bash
netlify env:set VITE_SUPABASE_URL "your-value"
netlify env:set VITE_SUPABASE_ANON_KEY "your-value"
netlify env:set VITE_STRIPE_PUBLIC_KEY "your-value"
```

## 🔄 Continuous Deployment

### GitHub Actions (Already Configured)
The `.github/workflows/deploy.yml` will:
1. Run tests on every push
2. Build the project
3. Deploy to Vercel/Netlify on main branch

### Manual Deployment
```bash
# Build locally
npm run build

# Deploy build folder
vercel --prod ./dist
# or
netlify deploy --prod --dir=dist
```

## 📊 Monitoring & Analytics

### 1. Set Up Google Analytics
1. Create GA4 property at analytics.google.com
2. Add tracking code to index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>
```

### 2. Set Up Monitoring
- **Vercel Analytics**: Enable in Vercel dashboard
- **Netlify Analytics**: Enable in Netlify dashboard
- **Sentry**: For error tracking
```bash
npm install @sentry/react
```

## 🎯 Post-Deployment Checklist

### Immediate Tasks
- [ ] Verify SSL certificate is active
- [ ] Test all forms and authentication
- [ ] Check mobile responsiveness
- [ ] Test page load speeds
- [ ] Verify Supabase connection
- [ ] Test email notifications

### SEO & Marketing
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile
- [ ] Configure social media meta tags
- [ ] Set up email marketing (SendGrid/Mailgun)
- [ ] Install chat widget (Intercom/Crisp)

### Security
- [ ] Enable 2FA on all services
- [ ] Set up WAF (Web Application Firewall)
- [ ] Configure CSP headers
- [ ] Set up DDoS protection (Cloudflare)
- [ ] Regular security audits

## 🔧 Troubleshooting

### DNS Propagation
- Use https://dnschecker.org to verify DNS propagation
- Can take up to 48 hours globally
- Use `nslookup growthmindset.ai` to check locally

### SSL Issues
```bash
# Check SSL certificate
curl -vI https://growthmindset.ai

# Force SSL renewal (Netlify)
netlify ssl:renew
```

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection Issues
1. Verify environment variables
2. Check Supabase project status
3. Review CORS settings in Supabase
4. Check Row Level Security policies

## 📱 Mobile App Deployment (Future)

### PWA Configuration
Already configured in `index.html` with:
- Web manifest
- Service worker ready
- App icons

### App Store Deployment
Consider using:
- Capacitor for iOS/Android
- React Native rebuild
- PWA to App Store via PWABuilder

## 💳 Payment Integration

### Stripe Setup
1. Create Stripe account
2. Get API keys from dashboard
3. Add webhook endpoint: `https://growthmindset.ai/api/stripe/webhook`
4. Configure products and prices in Stripe

### Webhook Configuration
```javascript
// netlify/functions/stripe-webhook.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  try {
    const event = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // Fulfill order
        break;
    }
    
    return { statusCode: 200 };
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
```

## 🚀 Launch Checklist

### Pre-Launch (1 Week Before)
- [ ] All features tested
- [ ] Content reviewed
- [ ] Legal pages ready (Terms, Privacy)
- [ ] Support system ready
- [ ] Team training complete

### Launch Day
- [ ] Deploy to production
- [ ] DNS switched
- [ ] Monitor systems
- [ ] Social media announcement
- [ ] Email announcement

### Post-Launch (First Week)
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Fix critical issues
- [ ] Optimize performance
- [ ] Review analytics

## 📞 Support Contacts

- **Vercel Support**: support@vercel.com
- **Netlify Support**: support@netlify.com
- **Supabase Support**: support@supabase.com
- **Domain Registrar**: (varies by provider)

## 🎉 Success Metrics

Track these KPIs:
- Page load time < 3 seconds
- 99.9% uptime
- SSL rating A+ (SSL Labs)
- Mobile score > 90 (PageSpeed Insights)
- SEO score > 90 (Lighthouse)

---

Your site is now ready for production deployment! 🚀
