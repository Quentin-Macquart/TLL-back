module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "coveragePathIgnorePatterns": [
        "/node_modules/"
    ],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/$1'
    }
};
