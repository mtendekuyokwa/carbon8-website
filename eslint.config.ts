// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  { ignores: [".react-router/", "build/", "storybook-static/", "node_modules/", ".opencode/", ".agents/", ".claude/", ".harness/"] },
  js.configs.recommended,
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: "detect" } },
    languageOptions: { ...pluginReact.configs.flat.recommended.languageOptions, parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { ...pluginReact.configs.flat.recommended.rules, "react/react-in-jsx-scope": "off", "react/jsx-uses-react": "off" },
  },
  pluginReactHooks.configs.flat["recommended-latest"],
  tailwindcss.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/enforces-canonical-classname": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "tailwindcss/important-modifier-suffix": "warn",
    },
    settings: {
      tailwindcss: {
        attributes: ["class", "className"],
        functions: ["cn", "twMerge", "twJoin", "clsx", "cva", "tv"],
        cssConfigPath: "app/app.css",
      },
    },
  },
  ...storybook.configs["flat/recommended"]
];
