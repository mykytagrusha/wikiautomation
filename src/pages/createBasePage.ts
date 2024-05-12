import { Page } from "playwright";

export const createBasePage = (page: Page) => {
  const visit = async (url: string) => {
    await page.goto(url);
  };
  return { visit };
};

export type BasePage = ReturnType<typeof createBasePage>;
