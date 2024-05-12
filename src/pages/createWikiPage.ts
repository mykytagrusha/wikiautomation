import { create } from "domain";
import { Page } from "playwright";
import { createBasePage } from "./createBasePage";
import { createSearchBar } from "./createSearchBar";
import { createResultPage } from "./createResultPage";

export const createWikiPage = (page: Page) => {
  const basePage = createBasePage(page);
  const visitMainPage = async () => {
    await basePage.visit("http://en.wikipedia.org/");
  };
  const searchBar = createSearchBar(page);
  const resultPage = (title: string) => createResultPage(page, title);
  return { visitMainPage, searchBar, resultPage };
};

export type WikiPage = ReturnType<typeof createWikiPage>;
