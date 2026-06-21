"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { LayoutDashboard, Trophy, Settings as SettingsIcon, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { path: '/character', label: 'Create Hero', icon: <User className="w-4 h-4" /> },
    { path: '/story', label: 'Story', icon: <Sparkles className="w-4 h-4" /> },
    { path: '/games', label: 'Trials', icon: <Trophy className="w-4 h-4" /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen w-full bg-darkFantasy-shadow text-white flex flex-col font-sans selection:bg-darkFantasy-accent selection:text-darkFantasy-highlight">
      {/* Accessibility skip link */}
      <SkipLink />

      {/* Atmospheric Header */}
      <header className="fixed top-0 left-0 w-full bg-darkFantasy-primary/90 backdrop-blur-md border-b border-darkFantasy-border p-4 z-50 shadow-lg shadow-darkFantasy-shadow/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-gothic text-darkFantasy-highlight tracking-wider group-hover:text-white transition-colors">
              SHADOWBOUND
            </span>
          </Link>

          <nav className="flex items-center flex-wrap justify-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 font-gothic transition-all duration-300 rounded-md px-3 py-1.5 text-sm",
                      isActive
                        ? "bg-darkFantasy-accent text-white shadow-md shadow-darkFantasy-accent/30 border border-darkFantasy-highlight/20"
                        : "text-darkFantasy-highlight hover:text-white hover:bg-darkFantasy-secondary/50"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pt-28 pb-12">
        {children}
      </main>

      {/* Atmospheric Footer */}
      <footer className="border-t border-darkFantasy-border bg-darkFantasy-primary/40 py-6 text-center text-xs text-darkFantasy-accent">
        <p className="font-gothic tracking-widest">MAY THE SHADOWS GUIDE YOUR PATH</p>
        <p className="mt-1 opacity-60">© {new Date().getFullYear()} Rise of the Shadowbound. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;