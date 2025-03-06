export default {
  testEnvironment: "jsdom", // ⬅️ Supaya bisa test komponen React
  transform: {
    "^.+\\.jsx?$": "babel-jest", // ⬅️ Biar Jest ngerti JSX
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  moduleNameMapper: {
    "\\.(png)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
};
