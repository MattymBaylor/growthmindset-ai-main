// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut, Settings, LayoutDashboard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const services = [
    {
      title: 'Voice AI Agents',
      href: '/services/voice-ai',
      description: '24/7 AI receptionists and call handlers',
    },
    {
      title: 'AI Recruitment',
      href: '/services/recruitment',
      description: 'Automated screening and interview systems',
    },
    {
      title: 'Financial Automation',
      href: '/services/payroll',
      description: 'AI-powered payroll and accounting',
    },
    {
      title: 'Call Center & Leads',
      href: '/services/call-center',
      description: 'Intelligent call distribution and lead management',
    },
    {
      title: 'Content Marketing AI',
      href: '/services/content-marketing',
      description: 'Automated social media and content creation',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Sparkles className="h-6 w-6 text-accent group-hover:text-accent/80 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              growthmindset.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/10 data-[state=open]:bg-accent/10',
                        isActive('/') && 'bg-accent/10 text-accent'
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    isActive('/services') && 'bg-accent/10 text-accent'
                  )}>
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {services.map((service) => (
                        <li key={service.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent"
                            >
                              <div className="text-sm font-medium leading-none">
                                {service.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/pricing">
                    <NavigationMenuLink
                      className={cn(
                        'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/10 data-[state=open]:bg-accent/10',
                        isActive('/pricing') && 'bg-accent/10 text-accent'
                      )}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink
                      className={cn(
                        'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/10 data-[state=open]:bg-accent/10',
                        isActive('/about') && 'bg-accent/10 text-accent'
                      )}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink
                      className={cn(
                        'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/10 data-[state=open]:bg-accent/10',
                        isActive('/contact') && 'bg-accent/10 text-accent'
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.user_metadata?.full_name || 'Account'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent/10 hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent',
                isActive('/') && 'bg-accent/10 text-accent'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent',
                isActive('/services') && 'bg-accent/10 text-accent'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent',
                isActive('/pricing') && 'bg-accent/10 text-accent'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent',
                isActive('/about') && 'bg-accent/10 text-accent'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent',
                isActive('/contact') && 'bg-accent/10 text-accent'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-border/40">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-accent/10 hover:text-accent"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
