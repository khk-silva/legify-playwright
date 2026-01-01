import * as fs from 'fs';
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

const credentials = JSON.parse(
  fs.readFileSync('data/credentials.json', 'utf-8')
);

export async function loginAsValidUser(page: Page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginToApp(
    credentials.validUser.username,
    credentials.validUser.password
  );
  await login.showLaunchpad();
}
