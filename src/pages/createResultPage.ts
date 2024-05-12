import { Page } from "playwright";

export const createResultPage = (page: Page, title: string) => {
  const searchPageHeader = page
    .getByRole("heading", { name: title })
    .locator("span");
  const searchResultListLinks = () =>
    page.getByLabel(title).getByRole("link").filter({ hasText: title }).all();

  return { searchPageHeader, searchResultListLinks };
};

export type ResultPage = ReturnType<typeof createResultPage>;
