import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextField from "@mui/material/TextField";
import { AddItemForm } from "../../components";

const handleFormSubmit = jest.fn();
const clearNewTradeItem = jest.fn();

describe("Add Item Form testing", () => {
  it("renders component properly with correct options button", () => {
    const { getByText } = render(
      <AddItemForm
        formText={"Add Trade Item"}
        primaryButtonText={"Add"}
        handleSubmit={handleFormSubmit}
        handleClose={clearNewTradeItem}
        fields={
          <React.Fragment>
            <TextField
              autoFocus
              margin="dense"
              label="textfield 1 label"
              fullWidth
              value={"textfield1"}
              variant="standard"
            />
          </React.Fragment>
        }
      />
    );

    expect(getByText("Add Trade Item")).toBeTruthy();
  });

  it("renders text fields on open form button click", () => {
    const { getByText } = render(
      <AddItemForm
        formText={"Add Trade Item"}
        primaryButtonText={"Add"}
        handleSubmit={handleFormSubmit}
        handleClose={clearNewTradeItem}
        fields={
          <React.Fragment>
            <TextField
              autoFocus
              margin="dense"
              label="textfield 1 label"
              fullWidth
              variant="standard"
            />
          </React.Fragment>
        }
      />
    );

    fireEvent.click(getByText("Add Trade Item"));
    expect(getByText("textfield 1 label")).toBeTruthy();
  });

  it("always clears new trade item when form is closed", () => {
    const { getByText } = render(
      <AddItemForm
        formText={"Add Trade Item"}
        primaryButtonText={"Add"}
        handleSubmit={handleFormSubmit}
        handleClose={clearNewTradeItem}
      />
    );

    fireEvent.click(getByText("Add Trade Item"));
    fireEvent.click(getByText("Add"));

    expect(handleFormSubmit).toHaveBeenCalled();
  });

  it("always calls handle submit ", () => {
    const { getByText } = render(
      <AddItemForm
        formText={"Add Trade Item"}
        primaryButtonText={"Add"}
        handleSubmit={handleFormSubmit}
        handleClose={clearNewTradeItem}
      />
    );

    fireEvent.click(getByText("Add Trade Item"));
    fireEvent.click(getByText("Cancel"));

    expect(clearNewTradeItem).toHaveBeenCalled();
  });
});
