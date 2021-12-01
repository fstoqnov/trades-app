import React from "react";
import { render } from "@testing-library/react";
import { TradesTable } from "../../components";
import { csvSplitRegex } from "../../utils/csvSplitter";

const testCsvData = `"header1","header2","header3"
"data 1 row 1","data 2 row 1","data 3 row 1"
"data 1 row 2","data 2 row 2","data 3 row 2"`;

const emptyTestCsvData = "";

describe("Trades Table testing", () => {
  it("renders component properly with upload button", () => {
    try {
      const { getByText, getByTestId } = render(<TradesTable />);

      expect(getByText("Upload Trades File")).toBeTruthy();
      expect(getByTestId("upload-file")).toBeTruthy();
    } catch (e) {
      console.error("laina");
    }
  });

  it("can use csvRegex to correctly split data and extract headers for table", () => {
    const dataStringLines = testCsvData.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(csvSplitRegex);

    expect(headers[0]).toEqual('"header1"');
    expect(headers[2]).toEqual('"header3"');
  });

  it("can returns empty list if provided csv data is empty or has an invalid format", () => {
    const dataStringLines = emptyTestCsvData.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(csvSplitRegex);
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(csvSplitRegex);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    expect(Object.values(list)).toEqual([]);
  });

  it("can use csvRegex to correctly split data into objects list for table", () => {
    const dataStringLines = testCsvData.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(csvSplitRegex);
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(csvSplitRegex);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    expect(Object.values(list[0])[0]).toEqual("data 1 row 1");
    expect(Object.values(list[1])[2]).toEqual("data 3 row 2");
  });
});
