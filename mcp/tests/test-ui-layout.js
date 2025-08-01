// Quotely Demo UI Layout Tests
// Tests for insurance platform interface and responsive design

const { test, expect } = require('@playwright/test');

test.describe('Quotely Demo UI Layout Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo application
    await page.goto('http://localhost:5173');
  });

  test('Hero section displays correctly', async ({ page }) => {
    // Test main hero section
    await expect(page.locator('h1')).toContainText('Quotely Demo Platform');
    await expect(page.locator('.hero p')).toContainText('modern insurance quoting platform');
    
    // Test CTA buttons
    await expect(page.locator('.cta-group .cta').first()).toBeVisible();
    await expect(page.locator('.cta-group .cta').first()).toContainText('View Demo Code');
  });

  test('Features section loads properly', async ({ page }) => {
    // Scroll to features section
    await page.locator('#features').scrollIntoViewIfNeeded();
    
    // Test features grid
    await expect(page.locator('.feature-grid')).toBeVisible();
    await expect(page.locator('.feature').first()).toContainText('Modern Interface');
    
    // Verify all 6 feature cards are present
    const featureCards = page.locator('.feature');
    await expect(featureCards).toHaveCount(6);
  });

  test('Comparison table renders correctly', async ({ page }) => {
    // Test competitive comparison table
    await page.locator('.comparison').scrollIntoViewIfNeeded();
    
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th').first()).toContainText('Feature');
    await expect(page.locator('th').nth(1)).toContainText('Applied Rater');
    await expect(page.locator('th').nth(2)).toContainText('EZLynx');
    await expect(page.locator('th').nth(3)).toContainText('Quotely');
    
    // Check for winner indicators
    await expect(page.locator('.winner').first()).toContainText('✅');
  });

  test('Mobile responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Hero section should stack on mobile
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.cta-group')).toBeVisible();
    
    // Features should stack properly
    await page.locator('#features').scrollIntoViewIfNeeded();
    await expect(page.locator('.feature-grid')).toBeVisible();
    
    // Table should be scrollable on mobile
    await page.locator('.comparison').scrollIntoViewIfNeeded();
    await expect(page.locator('.comparison-table')).toBeVisible();
  });

  test('Navigation and CTAs work', async ({ page }) => {
    // Test internal anchor navigation
    await page.locator('a[href="#features"]').click();
    await expect(page.locator('#features')).toBeInViewport();
    
    // Test external links (without navigating)
    const githubLink = page.locator('a[href="https://github.com/QuotelyInc/quotely-demo"]');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/QuotelyInc/quotely-demo');
    
    const demoLink = page.locator('a[href="https://quotely.com/demo"]');
    await expect(demoLink).toHaveAttribute('href', 'https://quotely.com/demo');
  });

  test('Footer content displays', async ({ page }) => {
    // Scroll to footer
    await page.locator('.footer').scrollIntoViewIfNeeded();
    
    await expect(page.locator('.footer')).toContainText('© 2025 Quotely Inc');
    await expect(page.locator('.footer')).toContainText('Modern insurance platform');
    await expect(page.locator('.footer')).toContainText('Alternative to Applied Rater, EZLynx');
  });

  test('Page performance and SEO elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Quotely Demo.*Applied Rater.*EZLynx/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Modern insurance quoting platform demo/);
    
    // Check keywords meta tag
    const metaKeywords = page.locator('meta[name="keywords"]');
    await expect(metaKeywords).toHaveAttribute('content', /insurance software.*applied rater alternative/);
  });

  test('Accessibility basics', async ({ page }) => {
    // Check for proper heading hierarchy
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h2')).toHaveCount(3); // Features, Comparison, Ready to Modernize
    
    // Check for alt attributes on images (if any)
    const images = page.locator('img');
    const imageCount = await images.count();
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        await expect(images.nth(i)).toHaveAttribute('alt');
      }
    }
    
    // Check link accessibility
    const links = page.locator('a');
    const linkCount = await links.count();
    for (let i = 0; i < Math.min(linkCount, 5); i++) { // Test first 5 links
      await expect(links.nth(i)).toHaveAttribute('href');
    }
  });

  test('Color contrast and visual design', async ({ page }) => {
    // Test hero section background
    const heroSection = page.locator('.hero');
    await expect(heroSection).toHaveCSS('background', /linear-gradient/);
    
    // Test feature cards have proper styling
    const featureCard = page.locator('.feature').first();
    await expect(featureCard).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(featureCard).toHaveCSS('border-radius', '12px');
    
    // Test table styling
    const tableHeader = page.locator('th').first();
    await expect(tableHeader).toHaveCSS('background-color', 'rgb(102, 126, 234)');
    await expect(tableHeader).toHaveCSS('color', 'rgb(255, 255, 255)');
  });

  test('Verify Quotely pricing grid layout', async ({ page }) => {
    await page.goto('http://localhost:3000/pricing');
    const grid = await page.locator('.pricing-grid');
    await expect(grid).toHaveCSS('display', 'grid');
  });

});