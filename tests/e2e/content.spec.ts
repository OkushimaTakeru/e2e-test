import { test, expect } from "@playwright/test";

const TARGET_URL = "https://example.com"\;
const API_URL = "https://jsonplaceholder.typicode.com/todos/1"\;

test.describe("Content Script E2Eテスト", () => {
  test("APIレスポンスが正しくUIに表示される", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id: 1, title: "テスト用タイトル", completed: false }),
      });
    });

    await page.goto(TARGET_URL);
    const result = page.locator("#extension-result");
    await expect(result).toBeVisible({ timeout: 5000 });
    await expect(result).toContainText("テスト用タイトル");
  });

  test("APIが500エラーのときエラーメッセージが表示される", async ({ page }) => {
    await page.route(API_URL, async (route) => {
      await route.fulfill({ status: 500 });
    });

    await page.goto(TARGET_URL);
    const error = page.locator("#extension-error");
    await expect(error).toBeVisible({ timeout: 5000 });
    await expect(error).toContainText("APIの取得に失敗しました");
  });
});
