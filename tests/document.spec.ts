import { test, expect } from '@playwright/test';
import { DocumentPage } from '../pages/documentPage';
import { LoginPage } from '../pages/loginPage';
import { readFileSync } from 'fs';
import path from 'path';
import { loginAsValidUser } from '../utils/authHelper';

test('Upload new document', async ({ page }) => {
  await loginAsValidUser(page); // use your helper
  const loginPage = new LoginPage(page);
  const documentPage = new DocumentPage(page);

  await documentPage.navigateToDocumentModule();
  await documentPage.clickCreateNewDocumentButton();
  await documentPage.clickUploadDocumentOption();
  await documentPage.isUploadNewDocumentWindowDisplayed();

  const documentData = JSON.parse(readFileSync('./data/document.json', 'utf-8'));
  const doc = documentData.NewUploadDoc1;

  await documentPage.enterDocumentTitle(doc.title);
  await documentPage.selectDocumentJurisdiction(doc.jurisdiction);
  await documentPage.selectDocumentType(doc.type);

  // Convert relative path to absolute
  const filePath = path.resolve(__dirname, '../testFiles/', doc.fileName);
  await documentPage.uploadDocumentFile(filePath);

  await documentPage.clickDocumentCreateButton();
  await documentPage.clickLetsGoButtonAfterProcessing();

   // ---------------- Collaborate on the same document ----------------
  await documentPage.clickCollaborateButton();
  await documentPage.addCollaboratorEmail('collaborator@example.com');
  await documentPage.clickInviteButton();
  await documentPage.verifySnackbarMessageDisplayed();

});


