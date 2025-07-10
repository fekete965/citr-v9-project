import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginReact.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/no-unescaped-entities": 0,
      "react/prop-types": 0,
    },
  },
  prettier,
]);
