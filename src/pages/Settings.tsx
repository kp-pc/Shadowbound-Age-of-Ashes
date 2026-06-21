import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function Settings() {
  const [loading, setLoading] = useState(false);

  const buttonList = useMemo(
    () => [
      { label: "Change Theme", onClick: () => console.log("Theme toggle") },
      { label: "Sound Settings", onClick: () => console.log("Sound toggle") },
    ],
    [],
  );

  return (
    <Card className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="flex flex-wrap gap-4 mb-6">
          {buttonList.map((btn, idx) => (
            <Button key={idx} variant="default" onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))}
        </div>
      )}
      <p className="text-gray-600">Coming soon: Save preferences here</p>
    </Card>
  );
}

export default Settings;