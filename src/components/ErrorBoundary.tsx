"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production you could log this to an external service
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    // Simple recovery: reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-darkFantasy-primary text-white p-4">
          <div className="max-w-lg text-center space-y-4">
            <h1 className="text-3xl font-gothic text-darkFantasy-highlight">
              Oops! Something went wrong.
            </h1>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="bg-darkFantasy-secondary p-2 rounded overflow-x-auto text-left text-sm">
                {this.state.error.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            )}
            <Button onClick={this.handleReload} className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight">
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}