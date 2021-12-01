import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { PrimaryButton } from "../StyledComponents";

const AddItemForm = ({
  handleSubmit,
  handleClose,
  fields,
  formText,
  primaryButtonText,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    handleClose();
    setOpen(false);
  };

  const submitItem = () => {
    handleSubmit();
    setOpen(false);
  };

  return (
    <div>
      <PrimaryButton variant="outlined" onClick={handleClickOpen}>
        {formText}
      </PrimaryButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formText}</DialogTitle>
        <DialogContent>{fields}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={submitItem}>{primaryButtonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddItemForm;
