"use client";

import React from "react";

export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const sizeClass = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  }[size];

  return (
    <div className="flex items-center justify-center py-4">
      <div
        className={`${sizeClass} border-darkFantasy-accent border-t-darkFantasy-highlight rounded-full animate-spin`}
      />
    </div>
  );
};