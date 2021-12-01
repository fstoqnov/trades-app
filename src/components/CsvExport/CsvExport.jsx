import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { PrimaryButton } from "../StyledComponents";
import { CSVModalLink } from "./CsvExport.styles";

const CsvExport = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Style const required for
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <React.Fragment>
      <PrimaryButton onClick={handleOpen}>Export to CSV</PrimaryButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CSVModalLink
            data={data}
            style={{}}
            asyncOnClick={true}
            filename="trades.csv"
            className="hidden"
            target="_blank"
          >
            Export to CSV
          </CSVModalLink>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CsvExport;
