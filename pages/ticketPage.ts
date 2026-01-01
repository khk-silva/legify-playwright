import { Page, Locator, expect } from '@playwright/test';

export class TicketPage {
  private readonly page: Page;

  // -------- Locators --------
  private readonly needAssistanceButton: Locator;
  private readonly ticketsHeaderText: Locator;
  private readonly ticketsMenuIcon: Locator;
  private readonly openTicketButton: Locator;
  private readonly subjectInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly submitButton: Locator;
  private readonly loader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.needAssistanceButton = page.locator(
      "//div[contains(@class,'menu-container__switch-menu-section')]//*[contains(normalize-space(),'Need assistance')]"
    );

    this.ticketsHeaderText = page.getByTestId('header_title_name');
    this.ticketsMenuIcon = page.locator("#side_menu_list_item_ico_tickets");
    this.openTicketButton = page.locator("//button[contains(.,'Open Ticket')]");
    this.subjectInput = page.locator("#subject");
    this.descriptionInput = page.locator("#description");
    this.submitButton = page.locator("//button[normalize-space()='Submit']");
    this.loader = page.locator(".loading-overlay");
  }
  

  // -------- Helpers --------
  async waitForLoaderToDisappear(): Promise<void> {
    if (await this.loader.isVisible().catch(() => false)) {
      await this.loader.waitFor({ state: 'hidden' });
    }
  }

  // -------- Actions --------
  async clickNeedAssistanceButton(): Promise<void> {
    await this.needAssistanceButton.waitFor({ state: 'visible' });
    await this.needAssistanceButton.scrollIntoViewIfNeeded();
    await this.needAssistanceButton.click();
  }

  async navigateToTicketsModule(): Promise<void> {
    await this.ticketsMenuIcon.waitFor({ state: 'visible' });
    await this.ticketsMenuIcon.scrollIntoViewIfNeeded();
    await this.ticketsMenuIcon.click();
  }

  async verifyTicketsPageVisible(): Promise<void> {
  await expect(this.ticketsHeaderText).toBeVisible({ timeout: 10000 });
  await expect(this.ticketsHeaderText).toHaveText(/Tickets/i);
}


  async clickOpenTicketButton(): Promise<void> {
    await this.openTicketButton.waitFor({ state: 'visible' });
    await this.openTicketButton.scrollIntoViewIfNeeded();
    await this.openTicketButton.click();
  }

  async isOpenTicketWindowDisplayed(): Promise<boolean> {
    return await this.openTicketButton.isVisible();
  }

  async enterSubject(subject: string): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.subjectInput.fill(subject);
  }

  async enterDescription(description: string): Promise<void> {
    await this.waitForLoaderToDisappear();
    await this.descriptionInput.fill(description);
  }

    async selectFromDropdown(formControlName: string, value: string): Promise<void> {
    const dropdown = this.page.locator(
        `//mat-select[@formcontrolname='${formControlName}']`
    );

    await this.waitForLoaderToDisappear();
    await dropdown.scrollIntoViewIfNeeded();
    await dropdown.click();

    // wait for panel to appear
    const panel = this.page.locator('.mat-select-panel').first();

    // pick the first visible matching option
    const option = panel.locator('.mat-option-text', { hasText: value }).first();

    await option.waitFor({ state: 'visible' });
    await option.click();
    }


  async clickSubmit(): Promise<void> {
    await this.waitForLoaderToDisappear();

    await this.submitButton.waitFor({ state: 'visible' });
    await expect(this.submitButton).toBeEnabled();

    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();

    await this.waitForLoaderToDisappear();
  }

  async isTicketSubmitted(): Promise<boolean> {
    try {
      await this.submitButton.waitFor({ state: 'hidden', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}
