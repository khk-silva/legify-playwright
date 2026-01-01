import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private emailField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private launchpadGreeting: Locator;

  constructor(private page: Page) {
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('.login-page__login-button');
    this.errorMessage = page.locator('.login-page__alert');
    this.launchpadGreeting = page.locator('.greeting-line');
  }

  async goto() {
    await this.page.goto('https://qa.app.legify.echonlabs.com/'); // Replace with your login URL
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async loginToApp(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async showLaunchpad() {
    await expect(this.launchpadGreeting).toBeVisible({ timeout: 5000 });
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
