import { defineWorkspace } from "vitest/config";

const vitestConfig = defineWorkspace({
  test: {
    projects: [
      {
        extends: "./vite.config.js",
        test: {
          include: ["**/*.node.test.{js,jsx}"],
          name: "happy-dom",
          environment: "happy-dom",
          coverage: {
            reporter: ["text", "json", "html"],
          },
        },
      },
      {
        extends: "./vite.config.js",
        test: {
          browser: {
            enabled: true,
            name: "chromium",
            provider: "playwright",
          },
          include: ["**/*.browser.test.{js,jsx}"],
          setupFiles: ["vitest-browser-react"],
          coverage: {
            reporter: ["text", "json", "html"],
          },
        },
      },
    ],
  },
});

export default vitestConfig;
