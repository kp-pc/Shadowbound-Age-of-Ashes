import React from 'react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full bg-white text-gray-800">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
        <div className="flex items-center space-x-4">
          <Button variant="default" onClick={() => window.location.href = "/"}>
            Dashboard
          </Button>
          <Button variant="default" onClick={() => window.location.href = "/games"}>
            Games
          </Button>
          <Button variant="default" onClick={() => window.location.href = "/settings"}>
            Settings
          </Button>
        </div>
      </div>
      <main className="flex-1 p-6 pt-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;