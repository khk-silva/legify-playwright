import { test } from '@playwright/test';
import { UserPage } from '../pages/userPage';
import { loginAsValidUser } from '../utils/authHelper'; // Reuse your login helper
import * as fs from 'fs';

const userData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

test.describe('User Creation Tests', () => {

  test('Create a new user successfully', async ({ page }) => {
    const userPage = new UserPage(page);

    // Login first
    await loginAsValidUser(page);

    // Navigate to Users page
    await userPage.navigateToUsersPage();

    // Open create user modal
    await userPage.clickCreateNewUserButton();

    // Fill form
    const userKey = 'testUser1';
    const data = userData[userKey];

    await userPage.selectSalutation(data.salutation);
    await userPage.enterFirstName(data.firstName);
    await userPage.enterLastName(data.lastName);
    await userPage.enterEmail(data.email);
    await userPage.selectCountry(data.country);
    await userPage.selectRole(data.role);

    // Submit
    await userPage.clickSubmitButton();

    // Verify
    await userPage.isUserCreatedSuccessfully(data.email);
  });

});
