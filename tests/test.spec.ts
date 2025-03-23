import { test, expect } from '@playwright/test';

function generateRandomNumbers(amount) {
    // Check if the input is a valid positive integer
    if (!Number.isInteger(amount) || amount <= 0) {
        return "Please provide a valid positive integer.";
    }

    // Array to store random numbers
    const randomNumbers = [];

    // Generate the specified amount of random numbers
    for (let i = 0; i < amount; i++) {
        // Generate a random integer between 0 and 999 (you can adjust the range)
        const randomNum = Math.floor(Math.random() * 1000);
        randomNumbers.push(randomNum);
    }

    return randomNumbers;
}



test('User Story 1', async ({ page }) => {
    const url = 'https://ctflearn.com/user/login';
    const user_name = "test_cbtw_2303";
    const password = "Password0!"
    // login
    await page.goto(url);
    await page.locator("#identifier").fill(user_name);
    await page.locator("#password").fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    //create challenge
    await page.locator("//li[@class = 'nav-item dropdown mr-3 my-auto']//a[@data-toggle = 'dropdown']").click();
    await page.getByText("Create Challenge").click();

    const title = "Title " + generateRandomNumbers(3)
    const flag = "CTFlearn{victory}"
    const solution ="Solution - 1" + generateRandomNumbers(20)
    await page.locator("#title").fill(title);
    await page.locator("#flag").fill(flag);
    await page.locator("#howtosolve").fill(solution);
    await page.getByRole('button', { name: 'Submit for Verification' }).click();

    //view created challange
    await page.locator("//li[@class = 'nav-item dropdown mr-3 my-auto']//a[@data-toggle = 'dropdown']").click();
    await page.locator("(//*[normalize-space()='My Challenges'])[1]").click();
    await expect(page.getByText(title)).toBeVisible();

    //logout
    await page.locator("//*[@id = 'profileDropdown']//img").click();
    await page.getByText("Logout").click();
    await expect(page.getByText("Login")).toBeVisible();
});
