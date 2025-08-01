# Screenshots for Visual Testing

## Directory Structure

- **`baseline/`** - Reference screenshots for visual regression testing
- **`test-results/`** - Generated screenshots during test runs

## Usage with MCP

### Capture Baseline Screenshots
```bash
cd mcp && npx playwright test --update-snapshots
```

### Visual Regression Testing
```bash
cd mcp && npx playwright test --reporter=html
```

## Key Areas to Screenshot

1. **Hero Section** - Main value proposition and CTAs
2. **Features Grid** - 6-card layout on desktop and mobile
3. **Comparison Table** - Applied Rater vs EZLynx vs Quotely
4. **Pricing Grid** - Pricing page layout validation
5. **Mobile Views** - Responsive design at 375px, 768px, 1024px

## Insurance Platform Specific Screenshots

- Quote generation workflows
- Carrier comparison displays
- Mobile agent interface
- Integration setup screens
- Migration guide visuals

## AI-Assisted Visual Testing

The MCP integration enables AI assistants to:
- Analyze screenshot differences
- Identify layout issues
- Suggest UI improvements
- Validate responsive design
- Check competitive positioning accuracy