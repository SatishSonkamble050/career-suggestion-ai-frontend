'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/layout/ThemeProvider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Moon, Sun, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getCurrentUser, mockLogout } from '@/lib/utils';
import { useAuth } from '@/hooks';

interface NavbarProps {
  transparent?: boolean;
  showAuth?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparent = false, showAuth = true }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  //const user = getCurrentUser();
  const { user } = useAuth();
  const handleLogout = () => {
    mockLogout();
    router.push('/');
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 border-b transition-smooth',
        transparent ? 'border-transparent bg-transparent' : 'border-border bg-background/95 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gradient">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">CG</span>
            </div>
            CareerGuide
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {user && (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/assessment/start">
                  <Button variant="ghost" size="sm">
                    Assessment
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    Profile
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Auth Buttons */}
            {showAuth && !user && (
              <div className="hidden sm:flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="gradient" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {showAuth && user && (
              <div className="hidden sm:flex gap-2">
                <Link href="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-border pb-4 md:hidden">
            <div className="space-y-1 pt-2">
              {user && (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/assessment/start" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Assessment
                    </Button>
                  </Link>
                  <Link href="/profile" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Profile
                    </Button>
                  </Link>
                </>
              )}

              {!user && (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <Button variant="gradient" className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
