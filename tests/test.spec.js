// test.spec.js
import { test, expect } from '@playwright/test';
import userData from '../testData/userData.json';


test('Validate dynamic table data', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');

  // Click on "Table Data" button
  await page.click('details summary');

  // Wait for input box to appear
  await page.waitForSelector('#jsondata');

  await page.fill('#jsondata',' ')
  // Fill the input text box with user data (JSON string)
  await page.fill('#jsondata', JSON.stringify(userData));

  // Click on "Refresh Table" button
  await page.click('#refreshtable');

  // Wait for table data to load
  await page.waitForTimeout(8000)

  const rowSelector1 = '#dynamictable tr:has-text("Bob")';

  // Select the first row, first column and verify data
  const firstNameCell = await page.locator(`${rowSelector1} td:nth-child(1)`);
  await expect(firstNameCell).toHaveText('Bob');

  // Assert that the second column contains '20'
  const ageCell = await page.locator(`${rowSelector1} td:nth-child(2)`);
  await expect(ageCell).toHaveText('20');

  // Assert that the third column contains 'male'
  const genderCell = await page.locator(`${rowSelector1} td:nth-child(3)`);
  await expect(genderCell).toHaveText('male');

  const rowSelector2 = '#dynamictable tr:has-text("George")';
// ============================================================================
  // Select the first row, first column and verify data
  const firstNameCel2 = await page.locator(`${rowSelector2} td:nth-child(1)`);
  await expect(firstNameCel2).toHaveText('George');

  // Assert that the second column contains '20'
  const ageCel2 = await page.locator(`${rowSelector2} td:nth-child(2)`);
  await expect(ageCel2).toHaveText('42');

  // Assert that the third column contains 'male'
  const genderCel2 = await page.locator(`${rowSelector2} td:nth-child(3)`);
  await expect(genderCel2).toHaveText('male');
  
});
