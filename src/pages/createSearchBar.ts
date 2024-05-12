import { Page } from "playwright";

export const createSearchBar = (page: Page) => {
  const searchForItem = async (searchTerm: string) => {
    await fillSearch(searchTerm);
    await page.getByPlaceholder("Search Wikipedia").press("Enter");
  };

  const fillSearch = (searchTerm: string) => {
    page.getByPlaceholder("Search Wikipedia").fill(searchTerm);
  };

  const dropdownResults = page
    .getByRole("heading", { name: "Search results" })
    .getByRole("option");

  return { searchForItem, dropdownResults, fillSearch };
};

export type SearchBar = ReturnType<typeof createSearchBar>;
