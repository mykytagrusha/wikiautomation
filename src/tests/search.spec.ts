import { link } from "fs";
import { chromium, Browser } from "playwright";
import { expect } from "playwright/test";
import { test } from "../fixtures";

test.describe("Search Functionality Tests", () => {
  test.beforeEach(async ({ wikiPage }) => {
    await wikiPage.visitMainPage();
  });

  test("should display relevant articles for a valid search term", async ({
    wikiPage,
  }) => {
    const expectedSearchWord = "Albert";

    await wikiPage.searchBar.searchForItem(expectedSearchWord);

    test.step("check that links are valid", async () => {
      expect(
        wikiPage.resultPage(expectedSearchWord).searchPageHeader
      ).toBeVisible();
      expect(
        (await wikiPage.resultPage(expectedSearchWord).searchResultListLinks())
          .length
      ).toBeGreaterThan(2);
    });
  });

  test("should display an exact match article for an exact search term", async ({
    page,
    wikiPage,
  }) => {
    const expectedSearchWord = "Adam Ondra";
    await wikiPage.searchBar.searchForItem(expectedSearchWord);
    test.step("check that article has correct title and url", async () => {
      expect(
        wikiPage.resultPage(expectedSearchWord).searchPageHeader
      ).toBeVisible();
      expect(await page.url()).toContain(
        expectedSearchWord.split(" ").join("_")
      );
    });
  });

  test("should display relevant articles for a partial search term", async ({
    wikiPage,
  }) => {
    const expectedSearchWord = "Wroclaw";
    const partialWord = expectedSearchWord.slice(0, 4);

    await wikiPage.searchBar.fillSearch(partialWord);

    test.step("check that links contains whe initial word", async () => {
      for (const dropdownLink of await wikiPage.searchBar.dropdownResults.allTextContents()) {
        expect(dropdownLink).toContain(expectedSearchWord);
      }
    });
  });

  test("should display no results for a non-existent topic", async ({
    wikiPage,
    page,
  }) => {
    const expectedSearchWord = "NonExistentTopic";

    await wikiPage.searchBar.searchForItem(expectedSearchWord);

    test.step("check that page no results displayed", async () => {
      expect(await page.getByText('The page "NonExistentTopic"')).toBeVisible();
      expect(await page.getByText("does not exist")).toBeVisible();
    });
  });
});
