import { Page } from "playwright";

export const createResultPage = (page: Page, title: string) => {
  const contentContainer = page.locator("main#content");
  const searchPageHeader = contentContainer
    .getByRole("heading", { name: title, exact: true })
    .locator("span");
  const searchResultListLinks = () =>
    contentContainer
      .getByLabel(title)
      .getByRole("link")
      .filter({ hasText: title })
      .all();

  return { searchPageHeader, searchResultListLinks };
};

export type ResultPage = ReturnType<typeof createResultPage>;
