import { expect } from "playwright/test";
import { test } from "../fixtures";

test.describe("Search Functionality Tests", () => {
  test.beforeEach(async ({ wikiPage }) => {
    await test.step("navigate to the main page", async () => {
      await wikiPage.visitMainPage();
    });
  });

  test("should display relevant articles for a valid search term", async ({
    wikiPage,
  }) => {
    const expectedSearchWord = "Albert";

    await test.step(`Seacrh for test word "${expectedSearchWord}"`, async () => {
      await wikiPage.searchBar.searchForItem(expectedSearchWord);
    });
    await test.step("check that links are valid", async () => {
      await expect(
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
    await test.step(`Seacrh for test word "${expectedSearchWord}"`, async () => {
      await wikiPage.searchBar.searchForItem(expectedSearchWord);
    });
    await test.step("check that article has correct title and url", async () => {
      await expect(
        wikiPage.resultPage(expectedSearchWord).searchPageHeader
      ).toBeVisible();
      await expect(await page.url()).toContain(
        expectedSearchWord.split(" ").join("_")
      );
    });
  });

  test("should display relevant articles for a partial search term", async ({
    wikiPage,
  }) => {
    const expectedSearchWord = "Wroclaw";
    const partialWord = expectedSearchWord.slice(0, 4);

    await test.step(`Type "${expectedSearchWord}" into searchbar`, async () => {
      await wikiPage.searchBar.fillSearch(partialWord);
    });

    await test.step("check that links contains whe initial word", async () => {
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

    await test.step(`Seacrh for non-existent article "${expectedSearchWord}"`, async () => {
      await wikiPage.searchBar.searchForItem(expectedSearchWord);
    });
    await test.step("check that page no results displayed", async () => {
      await expect(page.getByText('The page "NonExistentTopic"')).toBeVisible();
      await expect(page.getByText("does not exist")).toBeVisible();
    });
  });

  test("should search show the result from nonEnglish language ", async ({
    wikiPage,
    page,
  }) => {
    const expectedSearchWord = "Koln";
    const expectedWordInEnglish = "Cologne";

    await test.step(`Type "${expectedSearchWord}" into searchbar and wait till redirect`, async () => {
      await wikiPage.searchBar.searchForItem(expectedSearchWord);
      await page.waitForURL(`**/${expectedWordInEnglish}`);
    });

    await test.step("check that article has correct title and url", async () => {
      await expect(
        wikiPage.resultPage(expectedWordInEnglish).searchPageHeader
      ).toBeVisible();
      await expect(page.url()).toContain(expectedWordInEnglish);
    });
  });
});
