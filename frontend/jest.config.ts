import nextJest from "next/jest.js"
import type { Config } from "jest"

const createJestConfig = nextJest({ dir: "./" })

const customJestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
    "^.+\\.(png|jpg|jpeg|gif|svg|webp|ico|bmp|ttf|woff2?)$":
      "<rootDir>/tests/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
}

export default createJestConfig(customJestConfig)
