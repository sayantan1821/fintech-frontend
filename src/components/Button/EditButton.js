import React, { useReducer } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./buttonStyles";
const EditButton = ({ editRow, selected, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [editInput, setEditInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sl_no: "",
      invoice_currency: "",
      cust_payment_terms: "",
    }
  );
  const styles = useStyles();
  const handleEditSubmit = (e) => {
    e.preventDefault();
    editRow(
      editInput.sl_no,
      editInput.cust_payment_terms,
      editInput.invoice_currency
    );
    handleClose();
  };

  const handleEditInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setEditInput({ [name]: newValue });
    setEditInput({
      sl_no: selected[0],
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        {...props}
        variant="outlined"
        onClick={handleOpen}
        disabled={selected.length == 1 ? false : true}
      >
        EDIT
      </Button>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <TextField
              label="Invoice Currency"
              id="margin-normal"
              name="invoice_currency"
              // defaultValue="Invoice Currency"
              className={styles.textField}
              // style={{ width: "250px" }}
              helperText="Enter Invoice Currency"
              onChange={handleEditInput}
            />
            <TextField
              label="Cust Payment Terms"
              id="margin-normal"
              name="cust_payment_terms"
              // defaultValue="Total Open Amount"
              className={styles.textField}
              // style={{ width: "250px" }}
              helperText="Enter Cust Payment Terms"
              onChange={handleEditInput}
            />
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              type="submit"
              size="large"
              variant="outlined"
              color="primary"
              style={{ padding: "7px 100px" }}
            >
              UPDATE
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              style={{ padding: "7px 100px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditButton;
