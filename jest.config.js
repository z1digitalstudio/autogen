module.exports = {
  collectCoverage: true,
  coverageReporters: ["none"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["<rootDir>/tests/index.ts"]
};
