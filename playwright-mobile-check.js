const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }
  });
  const page = await context.newPage();
  
  console.log('📱 Testing mobile view at http://localhost:3000/templates');
  await page.goto('http://localhost:3000/templates');
  await page.waitForLoadState('networkidle');
  
  // Check 1: Floating filter button exists
  const filterButton = await page.locator('button:has-text("Filter")').count();
  console.log(filterButton > 0 ? '✅ Floating filter button found' : '❌ Filter button NOT found');
  
  // Check 2: No double header
  const oldHeader = await page.locator('.md\\:hidden.h-14.flex-row').count();
  console.log(oldHeader === 0 ? '✅ No double menu/header' : '❌ Old header still exists');
  
  // Check 3: Content is full width (no double containers)
  const mainContent = page.locator('text=Free Templates & Resources').first();
  const box = await mainContent.boundingBox();
  console.log(box ? `✅ Content width: ${box.width}px (should be close to 375px)` : '❌ Could not measure content');
  
  // Check 4: Click filter button and check overlay
  console.log('\n🔍 Clicking filter button...');
  await page.locator('button:has-text("Filter")').click();
  await page.waitForTimeout(500);
  
  const overlay = await page.locator('text=Filter by Category').isVisible();
  console.log(overlay ? '✅ Filter overlay opens correctly' : '❌ Overlay did not open');
  
  console.log('\n✨ All checks complete! Browser will stay open for 10 seconds...');
  await page.waitForTimeout(10000);
  
  await browser.close();
})();
