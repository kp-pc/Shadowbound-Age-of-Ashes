# Installation Guide

## One-Click Installation

### Option 1: Using Setup Script (Recommended)
1. Download the setup script:
   ```bash
   curl -O https://raw.githubusercontent.com/your-username/dark-fantasy-app/main/setup.sh
   ```

2. Make it executable and run:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

### Option 2: Manual Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dark-fantasy-app.git
   cd dark-fantasy-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

## Quick Start

After installation, you can:
- Start development: `npm run dev`
- Build for production: `npm run build`
- Preview production: `npm run preview`
- Create a release: `npm run release`

## Troubleshooting

### Common Issues

**Node.js not installed:**
```bash
# On macOS
brew install node

# On Ubuntu/Debian
sudo apt update && sudo apt install nodejs npm

# On Windows
# Download from https://nodejs.org/
```

**Permission errors:**
```bash
# On Unix systems
sudo chown -R $(whoami) node_modules
```

**Port already in use:**
```bash
# Change the port in vite.config.ts
# or stop other services using port 8080
```

## Support

For issues, please check the [GitHub Issues](https://github.com/your-username/dark-fantasy-app/issues) or contribute to the project.