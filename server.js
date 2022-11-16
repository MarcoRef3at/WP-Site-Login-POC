const playwright = require('playwright');
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./.env" });
const url = process.env.URL
const username = process.env.USER_NAME
const password = process.env.PASSWORD

const usernameInput = "[id=user_login]";
const userPasswordInput = "[id=user_pass]";
const loginButton = "[id=wp-submit]";

const runner = async () => {
     // Create Browser instance
     const browser = await playwright.chromium.launch({
          args: ["--start-maximized"],
          headless: false
     });
     const page = await browser.newPage();
     // Redirect to URL
     await page.goto(url);
     // Username Input
     await (
          await page.waitForSelector(usernameInput, { delay: 50 })
     ).type(username, { delay: 50 });
     // Password Input
     await (
          await page.waitForSelector(userPasswordInput, { delay: 50 })
     ).type(password, { delay: 50 });
     // Login button click
     await page.locator(loginButton, { delay: 50 }).click();
     console.log("Logging in...");
     await page.waitForNavigation();
     await page.waitForLoadState("domcontentloaded");
     console.log("Logged in")
     // Taking screenshot
     await page.screenshot({ path: 'screenshot.png' });
     // Close the browser
     await browser.close();
}

runner()