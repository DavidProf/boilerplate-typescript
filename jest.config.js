/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    bail: true,
    maxWorkers: 1,
    testMatch: ['**/test/**/*.spec.ts'],
    collectCoverageFrom: ['src/**'],
    coveragePathIgnorePatterns: ['src/index.ts', 'src/commons', '.d.ts'],
    coverageDirectory: 'test/coverage'
}
