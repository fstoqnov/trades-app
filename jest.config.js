const jestConfig = {
  verbose: true,
  testURL: "http://localhost",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["./src/components/TradesTable/TradesTable.test.jsx"],
};

module.exports = jestConfig;
