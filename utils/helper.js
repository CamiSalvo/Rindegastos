// utils/helper.js
const fs = require('fs');
const path = require('path');

async function takeScreenshot(driver, filename) {
  const screenshot = await driver.takeScreenshot();
  const filePath = path.join(__dirname, '../screenshots', filename);
  fs.writeFileSync(filePath, screenshot, 'base64');
}

module.exports = { takeScreenshot };
