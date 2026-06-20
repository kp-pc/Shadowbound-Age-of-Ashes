import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Settings() {
  return (
    <Card className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="default" onClick={() => console.log('Theme toggle')}>
          Change Theme
        </Button>
        <Button variant="default" onClick={() => console.log('Sound toggle')}>
          Sound Settings
        </Button>
      </div>
      <p className="text-gray-600">Coming soon: Save preferences here</p>
    </Card>
  );
}

export default Settings;