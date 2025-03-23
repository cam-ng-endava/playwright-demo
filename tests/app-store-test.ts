import { remote, Browser } from 'webdriverio';

describe('iOS Native App Test on LambdaTest', () => {
  let driver: Browser<'async'>;

  before(async () => {
    driver = await remote({
      hostname: 'hub.lambdatest.com',
      port: 80,
      path: '/wd/hub',
      user: process.env.LT_USERNAME,
      key: process.env.LT_ACCESS_KEY,
      capabilities: {
        platformName: 'iOS',
        deviceName: 'iPhone 14',
        platformVersion: '16',
        app: 'YOUR_APP_BUNDLE_ID', // Replace with your app's bundle ID
        automationName: 'XCUITest',
        isRealMobile: true,
        build: 'iOS Appium Test',
        name: 'Test Native iOS App'
      }
    });
  });

  it('should launch the app and perform an action', async () => {
    // Example: Check if the app launches by waiting for an element
    const element = await driver.$('~someElementId'); // Replace with an actual element locator
    await element.waitForDisplayed({ timeout: 30000 });
    console.log('Element found:', await element.getText());

    // Perform an action (e.g., tap a button)
    await element.click();
  });

  after(async () => {
    await driver.deleteSession();
  });
});