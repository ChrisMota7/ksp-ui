const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./"
})

/** @type {import('jest').Config} */
const customJestConfig = {
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '<rootDir>/**/*.{js,jsx,ts,tsx}',
    ],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: [
      '<rootDir>/src/**/*.test.js?(x)',
    ],
    transform: {
      // Use babel-jest to transpile tests with the next/babel preset
      // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
  }

module.exports = createJestConfig(customJestConfig)