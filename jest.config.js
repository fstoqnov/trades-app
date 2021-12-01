const jestConfig = {
  verbose: true,
  testURL: "http://localhost",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/__tests__/components.jsx"],
};

module.exports = jestConfig;
