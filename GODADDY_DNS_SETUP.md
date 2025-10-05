# 🌐 GoDaddy DNS Setup for growthmindset.ai

## 📍 Quick Access Link
Your domain control panel: https://dcc.godaddy.com/control/portfolio/growthmindset.ai/settings

## 🎯 Step-by-Step DNS Configuration

### Option A: Deploy to Vercel (Recommended - Best Performance)

#### Step 1: Access DNS Management
1. Go to: https://dcc.godaddy.com/control/portfolio/growthmindset.ai/settings
2. Click on **"DNS"** tab
3. You should see "DNS Records" section

#### Step 2: Remove Existing Records
**IMPORTANT**: Delete any existing A, AAAA, or CNAME records for @ and www to avoid conflicts
- Look for records with Name "@" or "www"
- Click the trash icon to delete them

#### Step 3: Add Vercel DNS Records

Click **"Add New Record"** and create these:

##### Record 1: Root Domain (growthmindset.ai)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 (or default)
```

##### Record 2: WWW Subdomain
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 600 (or default)
```
**Note**: The trailing dot (.) after .com is important!

#### Step 4: Save Changes
- Click **"Save All Records"**
- Changes take 5-48 hours to propagate globally

---

### Option B: Deploy to Netlify

#### Step 1: Access DNS Management
Same as above - go to your GoDaddy DNS settings

#### Step 2: Choose Configuration Method

##### Method 1: Use Netlify DNS (Easier)
Change your nameservers in GoDaddy:

1. In GoDaddy, click **"Nameservers"** (not DNS)
2. Choose **"Change Nameservers"**
3. Select **"Enter my own nameservers"**
4. Replace with Netlify's nameservers:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
5. Save changes

##### Method 2: Keep GoDaddy DNS
Add these records in GoDaddy DNS:

```
Type: A
Name: @
Value: 75.2.60.5
TTL: 600

Type: CNAME
Name: www
Value: YOUR-SITE-NAME.netlify.app.
TTL: 600
```

---

## 📧 Email Configuration (If Using Google Workspace)

Add these MX records for professional email:

```
Type: MX    Priority: 1   Name: @   Value: aspmx.l.google.com
Type: MX    Priority: 5   Name: @   Value: alt1.aspmx.l.google.com
Type: MX    Priority: 5   Name: @   Value: alt2.aspmx.l.google.com
Type: MX    Priority: 10  Name: @   Value: alt3.aspmx.l.google.com
Type: MX    Priority: 10  Name: @   Value: alt4.aspmx.l.google.com
```

Add SPF record for email authentication:
```
Type: TXT
Name: @
Value: "v=spf1 include:_spf.google.com ~all"
```

---

## 🔍 Verify DNS Configuration

### Check DNS Propagation
Use these tools to verify your DNS is working:
- https://dnschecker.org/#A/growthmindset.ai
- https://whatsmydns.net/#A/growthmindset.ai

### Expected Results
- A record for growthmindset.ai → 76.76.21.21 (Vercel)
- CNAME for www.growthmindset.ai → cname.vercel-dns.com

### Test Your Site
After DNS propagates (5-48 hours):
1. Visit: https://growthmindset.ai
2. Visit: https://www.growthmindset.ai
3. Both should load your site with SSL

---

## 🚨 Troubleshooting

### "Site Not Found" Error
- **Wait**: DNS can take up to 48 hours
- **Clear Cache**: Try incognito/private browsing
- **Check Records**: Verify records in GoDaddy match exactly

### SSL Certificate Issues
- Vercel/Netlify auto-provisions SSL after DNS is verified
- May take 10-30 minutes after DNS propagation
- If stuck, redeploy your site

### WWW vs Non-WWW
- Vercel/Netlify will handle redirects automatically
- Choose primary domain in deployment settings

### GoDaddy Parking Page Still Shows
1. Remove any GoDaddy forwarding/parking
2. Ensure no CNAME records point to park.godaddy.com
3. Clear browser cache

---

## 📱 Subdomain Setup (Optional)

### API Subdomain
```
Type: CNAME
Name: api
Value: cname.vercel-dns.com.
TTL: 600
```

### App Subdomain
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com.
TTL: 600
```

### Development Subdomain
```
Type: CNAME
Name: dev
Value: cname.vercel-dns.com.
TTL: 600
```

---

## 🔒 Security & Performance

### Add CAA Record (Optional but recommended)
```
Type: CAA
Name: @
Flags: 0
Tag: issue
Value: "letsencrypt.org"
```

### Enable DNSSEC
1. In GoDaddy DNS settings
2. Find "DNSSEC" section
3. Toggle to "On"

---

## 📋 Quick Checklist

Before deployment:
- [ ] Remove conflicting A/CNAME records
- [ ] Add Vercel/Netlify records
- [ ] Save all changes
- [ ] Note the time (for tracking propagation)

After deployment:
- [ ] Test with dnschecker.org
- [ ] Visit site in incognito mode
- [ ] Verify SSL padlock appears
- [ ] Test both www and non-www

---

## 💡 Pro Tips

1. **Screenshot Current Settings**: Before making changes, screenshot your current DNS records

2. **Gradual Migration**: Keep TTL low (600 seconds) during migration for faster updates

3. **Domain Forwarding**: Disable any GoDaddy domain forwarding - it conflicts with DNS records

4. **Development Access**: Add a dev subdomain pointing to your staging environment

5. **Backup DNS**: Export your DNS records after setup for backup

---

## 📞 Support Contacts

### GoDaddy DNS Support
- Phone: 1-480-505-8877
- Chat: Available in your account dashboard
- Help: https://www.godaddy.com/help/dns-680

### Vercel Support
- Docs: https://vercel.com/docs/concepts/projects/domains
- Discord: https://vercel.com/discord

### Netlify Support
- Docs: https://docs.netlify.com/domains-https/custom-domains/
- Forum: https://answers.netlify.com/

---

## ⏰ Timeline

1. **0-5 minutes**: DNS records updated in GoDaddy
2. **5-30 minutes**: Local ISP picks up changes
3. **1-4 hours**: Most global locations updated
4. **4-48 hours**: Complete global propagation
5. **10-30 minutes after DNS verified**: SSL certificate issued

---

## 🎯 Next Steps After DNS Setup

1. **Deploy your site** to Vercel/Netlify
2. **Configure domain** in deployment platform
3. **Wait for propagation** (check every hour)
4. **Test thoroughly** once live
5. **Set up monitoring** for uptime

Your site will be live at growthmindset.ai! 🚀
