#!/bin/bash

# 🚀 Growth Mindset AI - One-Click Deployment Script
# This script will deploy your site to production in minutes

echo "
╔══════════════════════════════════════════════════════╗
║     Growth Mindset AI - Production Deployment       ║
║              Powered by Supabase                    ║
╚══════════════════════════════════════════════════════╝
"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Function to check command availability
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Installing..."
        return 1
    else
        echo "✅ $1 is installed"
        return 0
    fi
}

echo "📋 Checking prerequisites..."
echo ""

# Check Node.js
check_command node
if [ $? -eq 1 ]; then
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check npm
check_command npm
if [ $? -eq 1 ]; then
    echo "Please install npm"
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up environment..."
if [ ! -f ".env" ]; then
    echo "Creating .env file with Supabase credentials..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🧪 Testing Supabase connection..."
node test-supabase.js

echo ""
echo "🏗️ Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "         DEPLOYMENT OPTIONS                           "
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Choose your deployment platform:"
echo "1) Vercel (Recommended - Best for Next.js/React)"
echo "2) Netlify (Great free tier)"
echo "3) Manual deployment (Upload dist folder)"
echo "4) Skip deployment"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        check_command vercel
        if [ $? -eq 1 ]; then
            echo "Installing Vercel CLI..."
            npm i -g vercel
        fi
        
        echo ""
        echo "📝 Vercel Deployment Instructions:"
        echo "1. You'll be asked to log in (if not already)"
        echo "2. Confirm the project settings"
        echo "3. Choose 'Production' deployment"
        echo ""
        read -p "Press Enter to continue..."
        
        vercel --prod
        
        echo ""
        echo "✅ Vercel deployment initiated!"
        echo ""
        echo "🌐 DNS Configuration for growthmindset.ai:"
        echo "   Add these records to your domain:"
        echo "   Type: A     Name: @    Value: 76.76.21.21"
        echo "   Type: CNAME Name: www  Value: cname.vercel-dns.com"
        ;;
        
    2)
        echo ""
        echo "🚀 Deploying to Netlify..."
        
        # Check if Netlify CLI is installed
        check_command netlify
        if [ $? -eq 1 ]; then
            echo "Installing Netlify CLI..."
            npm i -g netlify-cli
        fi
        
        echo ""
        echo "📝 Netlify Deployment Instructions:"
        echo "1. You'll be asked to log in (if not already)"
        echo "2. Choose 'Create & configure new site'"
        echo "3. Choose your team"
        echo ""
        read -p "Press Enter to continue..."
        
        netlify deploy --prod --dir=dist
        
        echo ""
        echo "✅ Netlify deployment initiated!"
        echo ""
        echo "🌐 DNS Configuration for growthmindset.ai:"
        echo "   Change nameservers to Netlify:"
        echo "   dns1.p01.nsone.net"
        echo "   dns2.p01.nsone.net"
        echo "   dns3.p01.nsone.net"
        echo "   dns4.p01.nsone.net"
        ;;
        
    3)
        echo ""
        echo "📁 Manual Deployment Instructions:"
        echo ""
        echo "1. Your production files are in: ./dist"
        echo "2. Upload the entire 'dist' folder to your hosting"
        echo "3. Configure your server to serve index.html for all routes"
        echo "4. Set up SSL certificate"
        echo "5. Point your domain to the server"
        echo ""
        echo "The built files are ready in ./dist"
        ;;
        
    4)
        echo "Skipping deployment..."
        ;;
        
    *)
        echo "Invalid choice. Skipping deployment..."
        ;;
esac

echo ""
echo "═══════════════════════════════════════════════════════"
echo "              NEXT STEPS                              "
echo "═══════════════════════════════════════════════════════"
echo ""
echo "1️⃣  SUPABASE SETUP (Required):"
echo "   • Go to: https://supabase.com/dashboard/project/ilvefyyasocmotxfzigg/sql"
echo "   • Run the SQL script: supabase_setup.sql"
echo "   • Enable Email/Password auth in Authentication settings"
echo "   • Add your domain to redirect URLs"
echo ""
echo "2️⃣  DOMAIN SETUP:"
echo "   • Configure DNS as shown above"
echo "   • SSL will auto-provision"
echo "   • Wait 5-30 mins for propagation"
echo ""
echo "3️⃣  PAYMENT SETUP (When Ready):"
echo "   • Create Stripe account"
echo "   • Add Stripe keys to environment variables"
echo "   • Configure webhook endpoints"
echo ""
echo "4️⃣  MONITORING:"
echo "   • Add Google Analytics"
echo "   • Set up error tracking (Sentry)"
echo "   • Configure uptime monitoring"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "        🎉 DEPLOYMENT COMPLETE! 🎉                    "
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📧 Support: dev@growthmindset.ai"
echo "📚 Docs: See README.md and DEPLOYMENT_GUIDE.md"
echo ""
echo "Your Growth Mindset AI platform is ready to transform businesses!"
echo ""
