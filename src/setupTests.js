import "@testing-library/jest-dom/extend-expect";

jest.mock("dateformat", () => ({
  dateFormat: jest.fn(),
}));
