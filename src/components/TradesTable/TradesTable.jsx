import React, { useState, useEffect } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextField from "@mui/material/TextField";

import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";

import { csvSplitRegex } from "../../utils/csvSplitter";
import { formatDateForTable } from "../../utils/dateFormatter";
import { DropdownContainer, OptionsContainer } from "../StyledComponents";
import { FilterDropdown, CsvExport } from "../../components";

import {
  LoadingText,
  UploadLabel,
  UploadText,
  TableTitleText,
  HeaderContainer,
} from "./TradesTable.styles";

import { AddItemForm } from "../../components";

const TradesTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const [isLodaing, setIsLoading] = useState();

  const [filteredData, setFilteredData] = useState([]);

  const [portfolios, setPortfolios] = useState([]);
  const [bbgCodes, setBbgCodes] = useState([]);
  const [actions, setActions] = useState([]);

  const [selectedPortfolio, setSelectedPortfolio] = useState("All Portfolios");
  const [selectedBbgCode, setSelectedBbgCode] = useState("All BBG Codes");
  const [selectedAction, setSelectedAction] = useState("All Actions");

  const [newTradeItem, setNewTradeItem] = useState({
    TradeID: "",
    BBGCode: "",
    Currency: "",
    Side: "",
    Price: "",
    Volume: "",
    Portfolio: "",
    Action: "",
    Account: "",
    Strategy: "",
    User: "",
    TradeTimeUTC: "",
    ValueDate: "",
  });

  const processCSVData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(csvSplitRegex);

    const list = [];
    const portfolioList = [];
    const bbgCodesList = [];
    const actionsList = [];
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
          if (!portfolioList.includes(obj.Portfolio)) {
            portfolioList.push(obj.Portfolio);
          }
          if (!bbgCodesList.includes(obj.BBGCode)) {
            bbgCodesList.push(obj.BBGCode);
          }
          if (!actionsList.includes(obj.Action)) {
            actionsList.push(obj.Action);
          }
        }
      }
    }

    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
    setPortfolios(portfolioList);
    setActions(actionsList);
    setBbgCodes(bbgCodesList);
    setIsLoading(false);
  };

  const handleFileUpload = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processCSVData(data);
    };
    reader.readAsBinaryString(file);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Trades per page",
  };

  const filterTrades = (filterOption) => {
    if (
      portfolios.includes(filterOption) ||
      filterOption === "All Portfolios"
    ) {
      setSelectedPortfolio(filterOption);
    } else if (
      actions.includes(filterOption) ||
      filterOption === "All Actions"
    ) {
      setSelectedAction(filterOption);
    } else {
      setSelectedBbgCode(filterOption);
    }
  };

  useEffect(() => {
    if (
      selectedPortfolio === "All Portfolios" &&
      selectedBbgCode != "All BBG Codes" &&
      selectedAction === "All Actions"
    ) {
      setFilteredData(
        data.filter((trade) => trade.BBGCode === selectedBbgCode)
      );
    } else if (
      selectedPortfolio != "All Portfolios" &&
      selectedBbgCode === "All BBG Codes" &&
      selectedAction === "All Actions"
    ) {
      setFilteredData(
        data.filter((trade) => trade.Portfolio === selectedPortfolio)
      );
    } else if (
      selectedPortfolio === "All Portfolios" &&
      selectedBbgCode === "All BBG Codes" &&
      selectedAction != "All Actions"
    ) {
      setFilteredData(data.filter((trade) => trade.Action === selectedAction));
    } else if (
      selectedPortfolio === "All Portfolios" &&
      selectedBbgCode != "All BBG Codes" &&
      selectedAction != "All Actions"
    ) {
      setFilteredData(
        data.filter(
          (trade) =>
            trade.Action === selectedAction && trade.BBGCode === selectedBbgCode
        )
      );
    } else if (
      selectedPortfolio != "All Portfolios" &&
      selectedBbgCode === "All BBG Codes" &&
      selectedAction != "All Actions"
    ) {
      setFilteredData(
        data.filter(
          (trade) =>
            trade.Action === selectedAction &&
            trade.Portfolio === selectedPortfolio
        )
      );
    } else if (
      selectedPortfolio != "All Portfolios" &&
      selectedBbgCode != "All BBG Codes" &&
      selectedAction === "All Actions"
    ) {
      setFilteredData(
        data.filter(
          (trade) =>
            trade.Portfolio === selectedPortfolio &&
            trade.BBGCode === selectedBbgCode
        )
      );
    } else if (
      selectedPortfolio === "All Portfolios" &&
      selectedBbgCode === "All BBG Codes" &&
      selectedAction === "All Actions"
    ) {
      setFilteredData(data.filter((trade) => !actions.includes(trade.Action)));
    } else {
      setFilteredData(
        data.filter(
          (trade) =>
            trade.Portfolio === selectedPortfolio &&
            trade.BBGCode === selectedBbgCode &&
            trade.Action === selectedAction
        )
      );
    }
  }, [selectedPortfolio, selectedBbgCode, selectedAction]);

  const handleFormSubmit = () => {
    let emptyFieldsFlag = false;
    for (const field of Object.entries(newTradeItem)) {
      if (field[1] === "") {
        emptyFieldsFlag = true;
      }
    }
    if (!emptyFieldsFlag) {
      setData([newTradeItem, ...data]);
      if (!bbgCodes.includes(newTradeItem.BBGCode)) {
        setBbgCodes([...bbgCodes, newTradeItem.BBGCode]);
      }
      if (!portfolios.includes(newTradeItem.Portfolio)) {
        setPortfolios([...portfolios, newTradeItem.Portfolio]);
      }
      if (!actions.includes(newTradeItem.Action)) {
        setActions([...actions, newTradeItem.Action]);
      }
      clearNewTradeItem();
    } else {
      clearNewTradeItem();
      alert("Please enter all fields in order to submit a new trade");
    }
  };

  const clearNewTradeItem = () => {
    setNewTradeItem({
      TradeID: "",
      BBGCode: "",
      Currency: "",
      Side: "",
      Price: "",
      Volume: "",
      Portfolio: "",
      Action: "",
      Account: "",
      Strategy: "",
      User: "",
      TradeTimeUTC: "",
      ValueDate: "",
    });
  };

  return (
    <React.Fragment>
      {!isLodaing ? (
        <React.Fragment>
          {data.length === 0 ? (
            <React.Fragment>
              <UploadLabel
                htmlFor="upload-file"
                data-testid="upload-file-button"
              >
                <UploadFileIcon style={{ fontSize: 50 }} />
                <UploadText>Upload Trades File</UploadText>
              </UploadLabel>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                id="upload-file"
                data-testid="upload-file"
                style={{ display: "none" }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <HeaderContainer>
                <TableTitleText>Trades</TableTitleText>
                <CsvExport data={data} />
              </HeaderContainer>
              <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={
                  filteredData.length === 0
                    ? selectedPortfolio === "All Portfolios" &&
                      selectedBbgCode === "All BBG Codes" &&
                      selectedAction === "All Actions"
                      ? data
                      : []
                    : filteredData
                }
                paginationComponentOptions={paginationComponentOptions}
              />
              <OptionsContainer>
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
                        label="Trade ID"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            TradeID: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="BBG Code"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            BBGCode: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Currency"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Currency: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Side"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Side: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Price"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Price: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Volume"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        variant="standard"
                        type="number"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Volume: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Portfolio"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Portfolio: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Action"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Action: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Account"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Account: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Strategy"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            Strategy: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="User"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            User: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Trade Time UTC"
                        fullWidth
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            TradeTimeUTC: e.target.value,
                          })
                        }
                      />
                      <TextField
                        margin="dense"
                        label="Value Date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        type={"date"}
                        variant="standard"
                        onChange={(e) =>
                          setNewTradeItem({
                            ...newTradeItem,
                            ValueDate: formatDateForTable(e.target.value),
                          })
                        }
                      />
                    </React.Fragment>
                  }
                />
                <DropdownContainer>
                  <FilterDropdown
                    filterOptions={actions}
                    handleClick={filterTrades}
                    selected={selectedAction}
                    selectAllText={"All Actions"}
                  />
                  <FilterDropdown
                    filterOptions={bbgCodes}
                    handleClick={filterTrades}
                    selected={selectedBbgCode}
                    selectAllText={"All BBG Codes"}
                  />
                  <FilterDropdown
                    filterOptions={portfolios}
                    handleClick={filterTrades}
                    selected={selectedPortfolio}
                    selectAllText={"All Portfolios"}
                  />
                </DropdownContainer>
              </OptionsContainer>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </React.Fragment>
  );
};

export default TradesTable;
