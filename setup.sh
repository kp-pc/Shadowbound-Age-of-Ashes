#!/bin/bash

# Rise of the Shadowbound - One-Click Setup Script
# This script automates the installation and setup process

set -e  # Exit on any error

echo "🌑 Setting up Rise of the Shadowbound..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (LTS) first."
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Clone repository if not already present
if [ ! -d "dark-fantasy-app" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/your-username/dark-fantasy-app.git dark-fantasy-app
    cd dark-fantasy-app
else
    echo "📁 Repository already exists, updating..."
    cd dark-fantasy-app
    git pull
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🎮 To start the application:"
echo "   cd dark-fantasy-app"
echo "   npm run dev"
echo ""
echo "🌐 Open http://localhost:8080 in your browser"