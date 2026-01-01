import { Page, Locator, expect } from '@playwright/test';

export class UserPage {
  readonly page: Page;

  // Locators
  readonly userMenuIcon: Locator;
  readonly usersPageHeader: Locator;
  readonly createNewUserButton: Locator;
  readonly createUserModal: Locator;

  readonly salutationDropdown: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly countryDropdown: Locator;
  readonly roleRadioGroup: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userMenuIcon = page.locator('#side_menu_list_item_ico_users');
    this.usersPageHeader = page.locator('#side_menu_list_item_users');
    this.createNewUserButton = page.locator('button:has-text("Create New User")');
    this.createUserModal = page.locator('div.user-form');

    this.salutationDropdown = page.locator('mat-select[formcontrolname="salutation"]');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.countryDropdown = page.locator('mat-select[formcontrolname="country"]');
    this.roleRadioGroup = page.locator('mat-radio-group[formcontrolname="role"]');
    this.submitButton = page.locator('button:has-text("Submit")');
  }

  // ---------------- Navigate Users Page ----------------
  async navigateToUsersPage() {
    await this.userMenuIcon.scrollIntoViewIfNeeded();
    await this.userMenuIcon.click();
    await expect(this.usersPageHeader).toBeVisible({ timeout: 10000 });
    await expect(this.createNewUserButton).toBeVisible();
  }

  // ---------------- Create User ----------------
  async clickCreateNewUserButton() {
    await this.createNewUserButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.createNewUserButton.click();
    await expect(this.createUserModal).toBeVisible();
  }

  // ---------------- Dropdowns ----------------
  private async selectDropdown(dropdown: Locator, optionText: string) {
    await dropdown.scrollIntoViewIfNeeded();
    await dropdown.click();
    const panel = this.page.locator('.mat-select-panel').first();
    const option = panel.locator('.mat-option-text', { hasText: optionText }).first();
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async selectSalutation(value: string) {
    await this.selectDropdown(this.salutationDropdown, value);
  }

  async selectCountry(value: string) {
    await this.selectDropdown(this.countryDropdown, value);
  }

  // ---------------- Name fields ----------------
  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // ---------------- Role ----------------
  async selectRole(roleName: string) {
    const radioOption = this.roleRadioGroup.locator(`mat-radio-button:has-text("${roleName}")`).first();
    await radioOption.scrollIntoViewIfNeeded();
    await radioOption.click();
  }

  // ---------------- Submit ----------------
  async clickSubmitButton() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  // ---------------- Verification ----------------
  async isUserCreatedSuccessfully(email: string) {
    const emailCell = this.page.locator(`tbody td div:has-text("${email}")`).first();
    await expect(emailCell).toBeVisible({ timeout: 10000 });
  }
}
