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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        className={selected.length == 1 ? styles.cudButtonEnabled : styles.cudButtonDisabled}
        disabled={selected.length == 1 ? false : true}
      >
        EDIT
      </Button>
      <Dialog
        PaperProps={{
          className: styles.dialog,
        }}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent
            // style={{ display: "flex", justifyContent: "space-around" }}
            className={styles.DialogContent}
          >
            <TextField
              label="Invoice Currency"
              id="margin-normal"
              name="invoice_currency"
              // defaultValue="Invoice Currency"
              className={styles.textField}
              // style={{ width: "250px" }}
              // helperText="Enter Invoice Currency"
              onChange={handleEditInput}
              required={true}
              InputProps={{
                className: styles.input,
              }}
            />
            <TextField
              label="Cust Payment Terms"
              id="margin-normal"
              name="cust_payment_terms"
              // defaultValue="Total Open Amount"
              className={styles.textField}
              // style={{ width: "250px" }}
              // helperText="Enter Cust Payment Terms"
              onChange={handleEditInput}
              required={true}
              InputProps={{
                className: styles.input,
              }}
            />
          </DialogContent>
          <DialogActions className={styles.DialogActions}>
            <Button
              type="submit"
              size="large"
              variant="outlined"
              className={styles.formButton}
            >
              UPDATE
            </Button>
            <Button
              size="large"
              variant="outlined"
              className={styles.formButton}
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
