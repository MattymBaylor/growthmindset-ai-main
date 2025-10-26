// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  Youtube,
  Facebook
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '/services' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API Docs', href: '/api-docs' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'Changelog', href: '/changelog' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
    ],
    Resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Contact', href: '/contact' },
      { name: 'Status', href: '/status' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
      { name: 'Compliance', href: '/compliance' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/growthmindsetai', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/growthmindsetai', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/growthmindsetai', label: 'GitHub' },
    { icon: Youtube, href: 'https://youtube.com/@growthmindsetai', label: 'YouTube' },
    { icon: Facebook, href: 'https://facebook.com/growthmindsetai', label: 'Facebook' },
  ];

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">growthmindset.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Transforming businesses with intelligent AI automation solutions.
            </p>
            
            <div className="space-y-2">
              <a 
                href="mailto:support@growthmindset.ai"
                className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                support@growthmindset.ai
              </a>
              <a 
                href="tel:+1-555-123-4567"
                className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </a>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-border/40" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Growth Mindset AI. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1">United States</span>
            <span>|</span>
            <span>SOC 2 Type II Certified</span>
            <span>|</span>
            <span>GDPR Compliant</span>
            <span>|</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
