import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { diagnostics: false }],
  },
  moduleNameMapper: {
    "^~/((?!.*\\.css$).*)$": "<rootDir>/app/$1",
    "\\.css$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/app/setupTests.ts"],
  testMatch: ["<rootDir>/app/**/*.test.{ts,tsx}"],
};

export default config;
