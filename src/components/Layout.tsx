import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full bg-white text-gray-800">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Button variant="default">Dashboard</Button>
          </Link>
          <Link to="/games" className="flex items-center space-x-2">
            <Button variant="default">Games</Button>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2">
            <Button variant="default">Settings</Button>
          </Link>
        </div>
      </div>
      <main className="flex-1 p-6 pt-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;