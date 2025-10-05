#!/bin/bash

# Setup script for Growth Mindset AI repository
echo "🚀 Setting up Growth Mindset AI repository..."

# Create remaining directories
echo "📁 Creating directory structure..."
mkdir -p src/pages/auth
mkdir -p src/pages/services
mkdir -p src/contexts
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/assets/images
mkdir -p public

# Copy auth pages
echo "📝 Setting up authentication pages..."
[ -f /mnt/user-data/outputs/LoginPage.jsx ] && cp /mnt/user-data/outputs/LoginPage.jsx src/pages/auth/
[ -f /mnt/user-data/outputs/SignupPage.jsx ] && cp /mnt/user-data/outputs/SignupPage.jsx src/pages/auth/

# Copy contexts
echo "🔐 Setting up contexts..."
[ -f /mnt/user-data/outputs/AuthContext.jsx ] && cp /mnt/user-data/outputs/AuthContext.jsx src/contexts/

# Copy UI components
echo "🎨 Setting up UI components..."
[ -f /mnt/user-data/outputs/button.jsx ] && cp /mnt/user-data/outputs/button.jsx src/components/ui/
[ -f /mnt/user-data/outputs/input.jsx ] && cp /mnt/user-data/outputs/input.jsx src/components/ui/

# Create additional required UI components
echo "✨ Creating additional UI components..."

# Card component
cat > src/components/ui/card.jsx << 'EOF'
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
EOF

# Badge component
cat > src/components/ui/badge.jsx << 'EOF'
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
EOF

# Create remaining page stubs
echo "📄 Creating page stubs..."

# Services pages
for service in VoiceAI Recruitment Payroll CallCenter ContentMarketing; do
  cat > src/pages/services/${service}Page.jsx << EOF
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ${service}Page = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">${service} Service</h1>
      <p className="text-muted-foreground mb-8">
        Advanced AI-powered ${service} solutions for your business.
      </p>
      <Button onClick={() => navigate('/pricing')}>
        Get Started
      </Button>
    </div>
  );
};

export default ${service}Page;
EOF
done

# Create remaining essential pages
cat > src/pages/ContactPage.jsx << 'EOF'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactPage = () => {
  return (
    <div className="min-h-screen p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: support@growthmindset.ai</p>
          <p>Phone: +1 (555) 123-4567</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
EOF

# Initialize git repository
echo "🔄 Initializing git repository..."
git add .
git commit -m "Complete repository setup with all components"

echo "✅ Repository setup complete!"
echo ""
echo "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Set up Supabase credentials in .env"
echo "3. Run development server: npm run dev"
echo "4. Push to GitHub: git push -u origin main"
