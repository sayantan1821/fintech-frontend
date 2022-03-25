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
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AnalyticsButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();
  const [openView, setOpenView] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleAddDate = (date, name) => {
    // console.log(date + "\t" + name);
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let convertedDate = `${year}-${month}-${day}`;
    // setAddInput({ ...addInput, [name]: convertedDate });
    // console.log(addInput);
  };

  const handleAnalyticsInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(newValue);
    // setAdvanceInput({ [name]: newValue });
  };
  const handleAnalyticsSubmit = (evt) => {
    evt.preventDefault();
    handleClose();
    handleOpenView();
  };
  return (
    <>
      <Button onClick={handleOpen} {...props}>
        <pre>ANALYTICS VIEW</pre>
      </Button>
      <Dialog
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ANALYTICS VIEW</DialogTitle>
        <form onSubmit={handleAnalyticsSubmit}>
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
              onChange={handleAnalyticsInput}
              required={false}
            />
            <TextField
              label="Customer No-(cust_number)"
              id="margin-normal"
              name="cust_number"
              // defaultValue="Total Open Amount"
              className={styles.textField}
              helperText="Enter Customer No-(cust_number)"
              onChange={handleAnalyticsInput}
              required={false}
            />
            <TextField
              label="Invoice No-(invoice_id)"
              id="margin-normal"
              name="invoice_id"
              // defaultValue="Invoice Currency"
              className={styles.textField}
              helperText="Enter Invoice No-(invoice_id)"
              onChange={handleAnalyticsInput}
              required={false}
            />
            <TextField
              label="Business Year- (buisness_year)"
              id="margin-normal"
              name="buisness_year"
              // defaultValue="Total Open Amount"
              className={styles.textField}
              helperText="Enter Business Year- (buisness_year)"
              onChange={handleAnalyticsInput}
              required={false}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">SUBMIT</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        fullWidth={true}
        fullScreen
        open={openView}
        onClose={handleCloseView}
      >
        <DialogTitle>Analytics VIEW</DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            Page Ban raha hai bro... 
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseView}>CLOSE</Button>
          </DialogActions>
      </Dialog>
    </>
  );
};

export default AnalyticsButton;
