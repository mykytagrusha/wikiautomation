import { test as baseTest } from "@playwright/test";
import { createWikiPage, WikiPage } from "./pages/createWikiPage";

interface BaseFixture {
  wikiPage: WikiPage;
}
export const test = baseTest.extend<BaseFixture>({
  wikiPage: async ({ page }, use) => {
    const wikiPage = createWikiPage(page);
    await use(wikiPage);
  },
});
