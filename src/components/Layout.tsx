import React from 'react';
import { Navigation, Button } from 'shadcn/ui';

function Layout({ children }) {
  return (
    <div className="h-screen w-full bg-white text-gray-800">
      <Navigation
        as="div"
        className="fixed top-0 left-0 w-full bg-white shadow-md p-4">
        <div className="flex items-center space-x-4">
          <Button color="blue" onClick={() => window.location.href = "/"}>
            Dashboard
          </Button>
          <Button color="blue" onClick={() => window.location.href = "/games"}>
            Games
          </Button>
          <Button color="blue" onClick={() => window.location.href = "/settings"}>
            Settings
          </Button>
        </div>
      </Navigation>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;