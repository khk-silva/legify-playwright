import * as fs from 'fs';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

// Load credentials from JSON
const credentials = JSON.parse(fs.readFileSync('data/credentials.json', 'utf-8'));

test.describe('Legify Login Tests', () => {

  test('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginToApp(credentials.validUser.username, credentials.validUser.password);
    await login.showLaunchpad();
  });

  test('Login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginToApp(credentials.invalidUser.username, credentials.invalidUser.password);
    const error = await login.getErrorMessage();
    expect(error).toContain(' The email address or password you entered is incorrect. Please try again.');
  });

});
