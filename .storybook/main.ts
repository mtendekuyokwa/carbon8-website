import type { StorybookConfig } from '@storybook/react-vite';

import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    // Remove only the React Router plugin (it throws "requires the use
    // of a Vite config file" in Storybook's programmatic builder).
    // Keep every other plugin — Storybook's builder needs its own.
    const isReactRouter = (p: unknown): boolean => {
      if (Array.isArray(p)) return p.some(isReactRouter);
      if (typeof p === "object" && p !== null && "name" in p) {
        const name = String((p as { name: unknown }).name);
        if (name.toLowerCase().includes("react-router")) return true;
      }
      return false;
    };
    const flat = (config.plugins ?? []).flat(Infinity as 1) as unknown[];
    config.plugins = flat.filter((p) => !isReactRouter(p));
    // Ensure Tailwind + the ~ alias are present.
    (config.plugins as unknown[]).push(tailwindcss());
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> | undefined),
      "~": path.resolve(dirname, "../app"),
    };
    return config;
  },
};
export default config;