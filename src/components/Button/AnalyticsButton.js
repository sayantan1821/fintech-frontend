import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useStyles } from "./buttonStyles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { makeStyles } from "@material-ui/core/styles";
import DataService from "../../services/DataService";
import Analytics from "../Analytics/Analytics";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AnalyticsButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();
  const [openView, setOpenView] = React.useState(false);
  const analyticsFormDetails = [
    {
      type: "date",
      start: {
        name: "clear_date_start",
        label: "Clear Date Start",
      },
      end: {
        name: "clear_date_end",
        label: "Clear Date End",
      },
    },
    {
      type: "date",
      start: {
        name: "due_in_date_start",
        label: "Due In Date Start",
      },
      end: {
        name: "due_in_date_end",
        label: "Due In Date End",
      },
    },
    {
      type: "date",
      start: {
        name: "baseline_create_date_start",
        label: "Baseline Create Date Start",
      },
      end: {
        name: "baseline_create_date_end",
        label: "Baseline Create Date End",
      },
    },
    {
      type: "text",
      name: "invoice_currency",
      label: "Invoice Currency",
      helperText: "",
    },
  ];
  const [analyticsInput, setAnalyticsInput] = useState({
    clear_date_start: null,
    clear_date_end: null,
    due_in_date_start: null,
    due_in_date_end: null,
    baseline_create_date_start: null,
    baseline_create_date_end: null,
    invoice_currency: "",
  });
  const [analyticsData, setAnalyticsData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);


  let api = new DataService();

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
    setAnalyticsInput({ ...analyticsInput, [name]: date });
  };

  const handleAnalyticsInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(newValue);
    setAnalyticsInput({ ...analyticsInput, [name]: newValue });
  };
  const handleAnalyticsSubmit = (evt) => {
    evt.preventDefault();
    // console.log(analyticsInput);
    api.getAnalytics(analyticsInput).then((res) => {
      setCurrencyData( Object.values(res.data.currency));
      setAnalyticsData(res.data.businessCode);
    });
    handleClose();
    handleOpenView();
  };

  return (
    <>
      <Button className={styles.advanceButton} onClick={handleOpen} {...props}>
        <pre>ANALYTICS VIEW</pre>
      </Button>
      <Dialog
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: styles.dialog,
        }}
      >
        <DialogTitle>ANALYTICS VIEW</DialogTitle>
        <form onSubmit={handleAnalyticsSubmit}>
          <DialogContent
          className={styles.analyticsDialogContent}
          
          >
            {analyticsFormDetails.map((form, idx) =>
              form.type === "date" ? (
                <div
                  key={idx}
                  className={styles.analyticsDateContainer}
                  // style={{ display: "flex", flexDirection: "column" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label={form.start.label}
                      inputFormat="MM/dd/yyyy"
                      value={analyticsInput[form.start.name]}
                      name="due_in_date_start"
                      onChange={(date) => handleAddDate(date, form.start.name)}
                      required={true}
                      renderInput={(params) => (
                        <TextField
                          // required={true}
                          // name={data.name}
                          // value={addInput[data.name]}
                          className={styles.textField}
                          // label={data.label}
                          // onChange={handleAddInput}
                          InputProps={{
                            className: styles.input,
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label={form.end.label}
                      inputFormat="MM/dd/yyyy"
                      value={analyticsInput[form.end.name]}
                      name="due_in_date_end"
                      onChange={(date) => handleAddDate(date, form.end.name)}
                      required={true}
                      renderInput={(params) => (
                        <TextField
                          // required={true}
                          // name={data.name}
                          // value={addInput[data.name]}
                          className={styles.textField}
                          // label={data.label}
                          // onChange={handleAddInput}
                          InputProps={{
                            className: styles.input,
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              ) : (
                <TextField
                  key={idx}
                  label={form.label}
                  id="margin-normal"
                  name={form.name}
                  className={styles.textField}
                  // helperText={form.helperText}
                  onChange={handleAnalyticsInput}
                  InputProps={{
                    className: styles.input,
                  }}
                  // required={true}
                />
              )
            )}
          </DialogContent>
          <DialogActions className={styles.DialogActions}>
            <Button className={styles.formButton} type="submit">SUBMIT</Button>
            <Button className={styles.formButton} onClick={handleClose}>Cancel</Button>
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
        <AppBar className={styles.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              // color="inherit"
              onClick={handleCloseView}
              aria-label="close"
              className={styles.backIcon}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={styles.analyticsTitle}>
              Analytics VIEW
            </Typography>
            <Button autoFocus className={styles.analyticsButton} onClick={handleCloseView}>
              CLOSE
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent
          className={styles.analyticsDialogContent}
        >
          <Analytics analyticsData={analyticsData} currencyData={currencyData}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnalyticsButton;
