import { defineConfig } from "@playwright/test";
import path from "path";

const extensionPath = path.resolve(__dirname);

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    channel: "chrome",
    launchOptions: {
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    },
  },
});
