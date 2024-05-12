import { Page } from "playwright";

export const createSearchBar = (page: Page) => {
  const searchContainer = page.locator("div#p-search");
  const searchForItem = async (searchTerm: string) => {
    await fillSearch(searchTerm);
    await page.getByRole("button", { name: "Search" }).click();
  };

  const fillSearch = async (searchTerm: string) => {
    await page.getByPlaceholder("Search Wikipedia").fill(searchTerm);
  };

  const dropdownResults = page
    .getByRole("heading", { name: "Search results" })
    .getByRole("option");

  return { searchForItem, dropdownResults, fillSearch };
};

export type SearchBar = ReturnType<typeof createSearchBar>;
