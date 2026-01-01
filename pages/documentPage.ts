import { expect, Locator, Page } from '@playwright/test';
import path from 'path';

export class DocumentPage {
  readonly page: Page;

  // ---------------- Locators ----------------
  readonly uploadDocumentBtn: Locator;
  readonly uploadDocumentBtnAlt: Locator;
  readonly popupContainer: Locator;
  readonly docTitleInput: Locator;
  readonly docJurisdictionDropdown: Locator;
  readonly docTypeDropdown: Locator;
  readonly docRecipientInput: Locator;
  readonly docFileUploadInput: Locator;
  readonly uploadNewDocumentTitle: Locator;
  readonly processedText: Locator;
  readonly letsGoBtn: Locator;
  readonly documentCard: Locator;
  readonly collaborateBtn: Locator;
  readonly collaboratePopup: Locator;
  readonly collaboratorEmailInput: Locator;
  readonly inviteBtn: Locator;
  readonly snackbarMessage: Locator;
  readonly signatureElement: Locator;
  readonly signatureCardPopup: Locator;
  readonly recipientNameInput: Locator;
  readonly recipientEmailInput: Locator;
  readonly assignBtn: Locator;
 readonly snackbar: Locator;

  constructor(page: Page) {
    this.page = page;

    this.uploadDocumentBtn = page.locator("//button[contains(@class,'plus-icon-button')]//i[contains(@class,'bi-upload')]");
    this.uploadDocumentBtnAlt = page.locator("button.plus-icon-button[aria-label='Upload new']");
    this.popupContainer = page.locator("//mat-dialog-container");
    this.docTitleInput = page.locator("//input[@formcontrolname='title']");
    this.docJurisdictionDropdown = page.locator("//mat-select[@formcontrolname='jurisdiction']");
    this.docTypeDropdown = page.locator("//mat-select[@formcontrolname='type']");
    this.docRecipientInput = page.locator("//input[@placeholder='Start by typing email']");
    this.docFileUploadInput = page.locator("//input[@type='file']");
    this.uploadNewDocumentTitle = page.locator("//div[contains(@class,'title-padding') and normalize-space()='Upload New Document']");
    this.processedText = page.locator("//p[contains(@class,'loading-text') and contains(text(),'successfully processed')]");
    this.letsGoBtn = page.locator("//button[normalize-space()=\"Let's Go\"]");
    this.documentCard = page.locator("//div[contains(@class,'doc-card')]");
    //this.collaborateBtn = page.locator("//button[.//span[contains(text(),'Collaborate')]]");
    // this.collaborateBtn = page.getByRole('button', { name: /Collaborate/i });

    // this.collaboratePopup = page.locator("mat-dialog-container invite-collaborators-popup");
    this.collaborateBtn = page.getByRole('button', { name: /Collaborate/i });

    this.collaboratePopup = page.getByRole('dialog', {
    name: /Invite Collaborators/i
    });

    this.collaboratorEmailInput = page.locator("//input[@placeholder='Search for Collaborators']");
    this.inviteBtn = page.locator("//mat-dialog-container//button[normalize-space()='Invite']");
    this.snackbarMessage = page.locator("//simple-snack-bar//span");
    this.signatureElement = page.locator("div.signature-section");
    this.signatureCardPopup = page.locator("//span[text()='Assign New Signer']");
    this.recipientNameInput = page.locator("//input[@placeholder='John Doe']");
    this.recipientEmailInput = page.locator("//input[@placeholder='Start by typing email']");
    this.assignBtn = page.locator("//button[normalize-space()='Assign']");
     this.snackbar = page.getByRole('alert', { name: 'Invitation sent successfully.' });
     
  }


  // ---------------- Actions ----------------

  async navigateToDocumentModule() {
    await expect(this.page.locator("//h4[normalize-space()='Documents']")).toBeVisible({ timeout: 10000 });
    await this.page.locator("//h4[normalize-space()='Documents']").click();
  }

  async clickCreateNewDocumentButton() {
    await expect(this.page.locator("//span[i[contains(@class,'bi-plus')] and contains(., 'Create New Document')]")).toBeVisible({ timeout: 10000 });
    await this.page.locator("//span[i[contains(@class,'bi-plus')] and contains(., 'Create New Document')]").click();
  }

  async clickUploadDocumentOption() {
    await expect(this.uploadDocumentBtn).toBeVisible({ timeout: 10000 });
    await this.uploadDocumentBtn.click();
  }

  async isUploadNewDocumentWindowDisplayed() {
    await expect(this.uploadNewDocumentTitle).toBeVisible();
  }

  async enterDocumentTitle(title: string) {
    await this.docTitleInput.fill(title);
  }

  async selectDocumentJurisdiction(jurisdiction: string) {
    await this.docJurisdictionDropdown.click();
    await this.page.locator(`//mat-option//span[normalize-space()='${jurisdiction}']`).click();
  }

  async selectDocumentType(type: string) {
    await this.docTypeDropdown.click();
    await this.page.locator(`//mat-option//span[normalize-space()='${type}']`).click();
  }

  async addRecipient(email: string) {
    await this.docRecipientInput.fill(email);
    await this.docRecipientInput.press('Enter');
  }

  async uploadDocumentFile(fileRelativePath: string) {
    const fullPath = path.resolve(__dirname, '../testFiles/', fileRelativePath);
    await this.docFileUploadInput.setInputFiles(fullPath);
}

  async clickDocumentCreateButton() {
    await this.page.locator("//button[normalize-space()='Create']").click();
  }

  async clickLetsGoButtonAfterProcessing() {
    await expect(this.processedText).toBeVisible();
     await expect(this.letsGoBtn).toBeVisible({ timeout: 10000 });
    await this.letsGoBtn.click();
  }

async clickCollaborateButton() {
  // Ensure button is ready
  await expect(this.collaborateBtn).toBeVisible({ timeout: 30000 });
  await expect(this.collaborateBtn).toBeEnabled();

  // Click when ready
  await this.collaborateBtn.click();

  // Wait for dialog to appear
  await expect(this.collaboratePopup).toBeVisible({ timeout: 30000 });
}


  async addCollaboratorEmail(email: string) {
   // await expect(this.collaboratorEmailInput).toBeVisible({ timeout: 10000 });
    await this.collaboratorEmailInput.fill(email);
    await this.collaboratorEmailInput.press('Enter');
  }

  async clickInviteButton() {
    await this.inviteBtn.click();
  }

  // In DocumentPage class
getSnackbarByText(text: string) {
  // Returns a locator for the snackbar with given text
  return this.page.locator('div').filter({ hasText: text }).first();
}

// async verifySnackbarMessageDisplayed(expectedText: string) {
//   const snackbar = this.page.locator(`div:has-text("${expectedText}")`);

//   // Wait for the snackbar **actually visible** in viewport
//   await expect(snackbar).toBeVisible({ timeout: 20000 });

//   // Optional: scroll into view
//   await snackbar.scrollIntoViewIfNeeded();
// }

async verifySnackbarMessageDisplayed() {
  // Wait until the snackbar alert is visible
  await expect(this.snackbar).toBeVisible({ timeout: 20000 });

  // Optional: scroll into view if needed
  await this.snackbar.scrollIntoViewIfNeeded();
}


  async dragAndDropSignatureIntoEditor() {
    // Simple drag and drop using Playwright API
    const signature = this.signatureElement;
    const editor = this.page.locator("div.empty-state.mt-1");
    await signature.dragTo(editor);
  }

  async clickSignatureElement() {
    await this.signatureElement.click();
  }

  async verifySignatureCardPopupDisplayed() {
    await expect(this.signatureCardPopup).toBeVisible();
  }

  async addRecipientName(name: string) {
    await this.recipientNameInput.fill(name);
    await this.recipientNameInput.press('Enter');
  }

  async addRecipientEmail(email: string) {
    await this.recipientEmailInput.fill(email);
    await this.recipientEmailInput.press('Enter');
  }

  async clickAssignButton() {
    await this.assignBtn.click();
  }
}
