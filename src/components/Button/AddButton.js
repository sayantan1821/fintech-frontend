import React from "react";
import {
    Button,
    ButtonGroup,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@material-ui/core";

const AddButton = () => {
  return (
    <div>
      <Button
      variant="outlined"
      // onClick={() => {
      //   openAddModal();
      // }}
      >
        ADD
      </Button>
    </div>
  );
};

export default AddButton;
