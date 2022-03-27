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
    clear_date_start: new Date(),
    clear_date_end: new Date(),
    due_in_date_start: new Date(),
    due_in_date_end: new Date(),
    baseline_create_date_start: new Date(),
    baseline_create_date_end: new Date(),
    invoice_currency: "",
  });
  const [analyticsData, setAnalyticsData] = useState({});

  const newUseStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  let api = new DataService();
  const classes = newUseStyles();

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
      console.log(res.data);
      setAnalyticsData(res.data);
    });
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
            {analyticsFormDetails.map((form, idx) =>
              form.type === "date" ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                  helperText={form.helperText}
                  onChange={handleAnalyticsInput}
                  // required={true}
                />
              )
            )}
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
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseView}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Analytics VIEW
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseView}>
              CLOSE
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >

          <Analytics analyticsData={analyticsData}  />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnalyticsButton;
