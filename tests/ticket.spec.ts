import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TicketPage } from '../pages/TicketPage';
// import { TicketPage } from '../pages/ticketPage';
import ticketData from '../data/tickets.json';
import { loginAsValidUser } from '../utils/authHelper';



test('Create Ticket - Success', async ({ page }) => {
  await loginAsValidUser(page);
  const loginPage = new LoginPage(page);
  const ticketPage = new TicketPage(page);

  await ticketPage.clickNeedAssistanceButton();
  await ticketPage.navigateToTicketsModule();
  await ticketPage.verifyTicketsPageVisible();

  await ticketPage.clickOpenTicketButton();
  expect(await ticketPage.isOpenTicketWindowDisplayed()).toBeTruthy();

  const data = ticketData.validTicket;

  await ticketPage.selectFromDropdown('priority', data.priority);
  await ticketPage.selectFromDropdown('category', data.category);
  await ticketPage.enterSubject(data.subject);
  await ticketPage.enterDescription(data.description);

  await ticketPage.clickSubmit();
  expect(await ticketPage.isTicketSubmitted()).toBeTruthy();
});
