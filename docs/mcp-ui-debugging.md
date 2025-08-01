# How to Use MCP for UI Debugging

## Start Playwright MCP
```bash
npm run start:mcp
```

## Running UI Tests

### Basic Test Execution
```bash
# Run all tests
cd mcp && npm test

# Run specific UI layout tests
cd mcp && npm run test:ui

# Run tests in headed mode (visible browser)
cd mcp && npm run test:headed

# Debug mode with step-by-step execution
cd mcp && npm run test:debug
```

### MCP Server Integration

The MCP (Model Context Protocol) server provides browser automation capabilities for testing the Quotely insurance platform interface.

#### Configuration
- **Server**: Playwright MCP server (`@playwright/mcp`)
- **Port**: Auto-assigned by MCP
- **Tests Location**: `./mcp/tests/`

### Available Test Suites

1. **Hero Section Tests**
   - Validates main messaging and CTAs
   - Tests competitive positioning against Applied Rater/EZLynx

2. **Features Grid Validation**
   - Ensures all 6 feature cards display correctly
   - Verifies responsive layout

3. **Comparison Table Tests**
   - Validates competitive comparison data
   - Tests table responsiveness on mobile

4. **Pricing Grid Layout** (New)
   - Tests pricing page grid display
   - Validates CSS grid implementation

### Debugging Common Issues

#### Test Failures
```bash
# Check if dev server is running first
npm run dev

# Then run tests against localhost:5173
cd mcp && npm test
```

#### Mobile Responsiveness Issues
```bash
# Test specific viewport sizes
cd mcp && npx playwright test --config playwright.config.mobile.js
```

#### Performance Testing
```bash
# Run with performance metrics
cd mcp && npx playwright test --reporter=html
```

### Integration with CI/CD

The GitHub Actions workflow automatically:
1. Installs Playwright browsers
2. Runs MCP server
3. Executes UI tests on every push/PR

### Best Practices

- **Start Dev Server**: Always run `npm run dev` before testing
- **Clean State**: Each test starts with a fresh page load
- **Responsive Testing**: Tests include mobile viewport validation
- **Accessibility**: Basic a11y checks included in test suite

### Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP server not starting | Check if port 3000/5173 is available |
| Tests timing out | Increase timeout in playwright.config.js |
| Element not found | Use `scrollIntoViewIfNeeded()` for off-screen elements |
| CSS changes not reflected | Clear browser cache and restart dev server |

### Extending Tests

Add new tests to `./mcp/tests/test-ui-layout.js`:

```javascript
test('New feature validation', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // Your test logic here
});
```

For insurance-specific testing, focus on:
- Quote generation workflows
- Carrier comparison displays
- Mobile agent interface usability
- Integration points with Applied Rater/EZLynx alternatives