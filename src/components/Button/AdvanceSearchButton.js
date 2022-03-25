import React from "react";
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

const AdvanceSearchButton = ({
  setTableContent,
  advanceInput,
  setAdvanceInput,
  setState,
  state,
  setPageNo,
  setRecordPerPage,
  advanceNotify,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  const handleOpen = () => {
    setAdvanceInput({
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdvanceInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setAdvanceInput({ [name]: newValue });
  };
  const handleAdvanceSubmit = (evt) => {
    evt.preventDefault();
    setTableContent("advanceTable");
    setPageNo(0);
    setRecordPerPage(10);
    setState(state + 1);
    advanceNotify();
    handleClose();
  };
  return (
    <>
      <Button {...props} onClick={handleOpen}>
        <pre>ADVANCE SEARCH</pre>
      </Button>
      <Dialog TransitionComponent={Transition} fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>ADVANCED SEARCVH</DialogTitle>
        <form onSubmit={handleAdvanceSubmit}>
          <DialogContent
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={styles.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAdvanceInput}
              required={false}
            />
            <TextField
              label="Customer No-(cust_number)"
              id="margin-normal"
              name="cust_number"
              // defaultValue="Total Open Amount"
              className={styles.textField}
              helperText="Enter Customer No-(cust_number)"
              onChange={handleAdvanceInput}
              required={false}
            />
            <TextField
              label="Invoice No-(invoice_id)"
              id="margin-normal"
              name="invoice_id"
              // defaultValue="Invoice Currency"
              className={styles.textField}
              helperText="Enter Invoice No-(invoice_id)"
              onChange={handleAdvanceInput}
              required={false}
            />
            <TextField
              label="Business Year- (buisness_year)"
              id="margin-normal"
              name="buisness_year"
              // defaultValue="Total Open Amount"
              className={styles.textField}
              helperText="Enter Business Year- (buisness_year)"
              onChange={handleAdvanceInput}
              required={false}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">SEARCH</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AdvanceSearchButton;
