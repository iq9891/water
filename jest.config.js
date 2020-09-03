const transformIgnorePatterns = [
  '/dist/',
  'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
];

module.exports = {
  testURL: 'http://localhost/',
  // setupFiles: ['./tests/setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue', 'md', 'jpg'],
  testPathIgnorePatterns: ['/node_modules/', 'node'],
  transform: {
    '^.+\\.(vue|md)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.svg$': '<rootDir>/node_modules/jest-transform-stub',
  },
  testRegex: '.*\\.test\\.js$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  collectCoverage: process.env.COVERAGE === 'true',
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!**/node_modules/**',
  ],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  transformIgnorePatterns,
};
