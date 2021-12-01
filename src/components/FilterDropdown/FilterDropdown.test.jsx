import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FilterDropdown } from "../../components";

const filterOptionsMock = ["option 1", "option 2", "option 3"];

const filterTrades = jest.fn();

describe("Filter Dropdown testing", () => {
  it("renders component properly with correct options button", () => {
    const { getByText } = render(
      <FilterDropdown
        filterOptions={filterOptionsMock}
        handleClick={filterTrades}
        selected={filterOptionsMock[1]}
        selectAllText={"All Actions"}
      />
    );

    expect(getByText("option 2")).toBeTruthy();
  });

  it("handles filter call on option press", () => {
    const { getByText, getByTestId } = render(
      <FilterDropdown
        filterOptions={filterOptionsMock}
        handleClick={filterTrades}
        selected={filterOptionsMock[1]}
        selectAllText={"All Actions"}
      />
    );
    fireEvent.click(getByTestId("dropdown-button-test-id"));
    fireEvent.click(getByText("option 1"));

    expect(filterTrades).toHaveBeenCalled();
  });

  it("handles correctly changes selected option on press", () => {
    const { getByText, getByTestId } = render(
      <FilterDropdown
        filterOptions={filterOptionsMock}
        handleClick={filterTrades}
        selected={filterOptionsMock[1]}
        selectAllText={"All Actions"}
      />
    );
    expect(getByText("option 2")).toBeTruthy();

    fireEvent.click(getByTestId("dropdown-button-test-id"));
    fireEvent.click(getByText("option 1"));

    expect(getByText("option 1")).toBeTruthy();
  });
});
