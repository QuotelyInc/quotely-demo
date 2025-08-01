# MCP Integration Guide - Quotely Demo

## 🚀 Quick Start for Development Teams

This repository is **MCP-ready** for AI-assisted development and testing of the Quotely insurance platform demo.

### What is MCP?

**Model Context Protocol (MCP)** enables AI assistants like Claude to interact directly with development tools, providing intelligent testing, debugging, and code assistance.

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
# Main project dependencies
npm install

# MCP test dependencies
cd mcp && npm install
```

### 2. Install Playwright Browsers
```bash
cd mcp && npx playwright install
```

### 3. Start Development Environment
```bash
# Terminal 1: Start the demo app
npm run dev

# Terminal 2: Start MCP server (when needed)
npm run start:mcp
```

## 🧪 Testing with MCP

### Available Test Commands
```bash
# Run all UI tests
cd mcp && npm test

# Run specific layout tests
cd mcp && npm run test:ui

# Debug mode (visible browser)
cd mcp && npm run test:headed

# Step-by-step debugging
cd mcp && npm run test:debug
```

### Test Coverage
- ✅ Hero section and CTAs
- ✅ Features grid layout
- ✅ Competitive comparison tables
- ✅ Mobile responsiveness
- ✅ Pricing grid validation
- ✅ SEO meta tags
- ✅ Accessibility basics

## 🤖 AI Assistant Integration

### Claude Code Integration
The `.claude.json` file configures AI context for:
- Insurance platform development
- Competitive positioning vs Applied Rater/EZLynx
- MCP test automation
- Integration documentation

### Common AI Prompts
- *"Run the UI tests and analyze any failures"*
- *"Check mobile responsiveness of the comparison table"*
- *"Validate the pricing grid layout on different screen sizes"*
- *"Debug the competitive comparison section"*

## 📁 Project Structure

```
quotely-demo/
├── .claude.json          # AI assistant configuration
├── mcp-config.json       # MCP server configuration
├── MCP_README.md         # This file
├── docs/                 # Integration & migration guides
│   ├── applied-rater-migration.md
│   ├── mcp-ui-debugging.md
│   └── integrations/
├── examples/             # Competitive comparisons
├── mcp/                  # Playwright MCP tests
│   ├── package.json
│   └── tests/
│       └── test-ui-layout.js
├── src/                  # React application
└── .github/workflows/    # CI/CD with MCP validation
```

## 🎯 Insurance Platform Focus Areas

### Competitive Positioning
- **Applied Rater**: Legacy system migration guides
- **EZLynx**: Feature-by-feature comparisons
- **TurboRater**: Integration documentation
- **Momentom AMP**: Setup guides

### Key Features to Test
1. **Quote Generation Interface**
2. **Multi-Carrier Comparisons**
3. **Mobile Agent Workflows**
4. **API Integration Points**
5. **Responsive Design Validation**

## 🚨 Troubleshooting

### MCP Server Issues
```bash
# Check if ports are available
lsof -i :3000
lsof -i :5173

# Restart development server
npm run dev

# Clear browser cache and restart MCP
npm run start:mcp
```

### Test Failures
```bash
# Run tests with detailed output
cd mcp && npx playwright test --reporter=list

# Generate HTML test report
cd mcp && npx playwright test --reporter=html
```

### Common Issues
- **Port conflicts**: Stop other local servers
- **Browser not found**: Run `npx playwright install`
- **Test timeouts**: Check if dev server is running on localhost:5173

## 🔄 CI/CD Integration

GitHub Actions automatically:
1. ✅ Validates MCP server startup
2. ✅ Runs UI layout tests
3. ✅ Checks mobile responsiveness
4. ✅ Validates competitive comparison data

## 📞 Team Onboarding

### For Developers
1. Clone repo and run setup commands above
2. Familiarize yourself with insurance platform terminology
3. Review competitive positioning docs in `/docs`
4. Run MCP tests to understand validation coverage

### For QA Engineers
1. Focus on MCP test suite in `/mcp/tests/`
2. Understand insurance agent user workflows
3. Test against Applied Rater/EZLynx alternatives
4. Validate mobile agent interface usability

### For Product Managers
1. Review competitive comparison documentation
2. Understand migration value propositions
3. Test key differentiators vs legacy platforms
4. Validate positioning messaging accuracy

## 🎉 Ready for AI-Assisted Development!

This repository is optimized for:
- **Intelligent testing** with Playwright MCP
- **Automated debugging** of UI issues
- **AI-guided development** workflows
- **Insurance domain expertise** integration

Run `npm run start:mcp` and start building the future of insurance technology! 🚀