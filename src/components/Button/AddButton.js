import React, { useState, useReducer, useEffect } from "react";
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
} from "@material-ui/core";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useStyles } from "./buttonStyles";
import { GrAdd } from "react-icons/gr";
import { add } from "date-fns";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddButton = ({ addRow, addNotify, ...props }) => {
  const [open, setOpen] = useState(false);
  const [addFormDetails] = useState([
    {
      type: "text",
      name: "business_code",
      label: "Business Code",
      helperText: "",
    },
    {
      type: "text",
      name: "cust_number",
      label: "Customer Number",
      helperText: "",
    },
    {
      type: "date",
      name: "clear_date",
      label: "Clear Date",
      helperText: "",
    },
    {
      type: "text",
      name: "buisness_year",
      label: "Business Year",
      helperText: "",
    },
    {
      type: "text",
      name: "doc_id",
      label: "Document ID",
      helperText: "",
    },
    {
      type: "date",
      name: "posting_date",
      label: "Posting Date",
      helperText: "",
    },
    {
      type: "date",
      name: "document_create_date",
      label: "Document Create Date",
      helperText: "",
    },
    {
      type: "date",
      name: "due_in_date",
      label: "Due In Date",
      helperText: "",
    },
    {
      type: "text",
      name: "invoice_currency",
      label: "Invoice Currency",
      helperText: "",
    },
    {
      type: "text",
      name: "document_type",
      label: "Document Type",
      helperText: "",
    },
    {
      type: "text",
      name: "posting_id",
      label: "Posting ID",
      helperText: "",
    },
    {
      type: "text",
      name: "total_open_amount",
      label: "Total Open Amount",
      helperText: "",
    },
    {
      type: "date",
      name: "baseline_create_date",
      label: "Baseline Create DAte",
      helperText: "",
    },
    {
      type: "text",
      name: "cust_payment_terms",
      label: "Customer Payment Terms",
      helperText: "",
    },
    {
      type: "text",
      name: "invoice_id",
      label: "Invoice ID",
      helperText: "",
    },
  ]);
  const [addInput, setAddInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sl_no: "",
      business_code: "",
      cust_number: "",
      clear_date: new Date(),
      buisness_year: "",
      doc_id: "",
      posting_date: new Date(),
      document_create_date: new Date(),
      due_in_date: new Date(),
      invoice_currency: "",
      document_type: "",
      posting_id: "",
      total_open_amount: "",
      baseline_create_date: new Date(),
      cust_payment_terms: "",
      invoice_id: "",
    }
  );
  const styles = useStyles();

  useEffect(() => {
    addInput.due_in_date.setDate(addInput.posting_date.getDate() + 1);
  }, []);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleAddInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(newValue);
    setAddInput({ [name]: newValue });
  };
  const handleAddDate = (date, name) => {
    if (name === "posting_date") {
      setAddInput({ ...addInput, posting_date: date, due_in_date: date });
    } else if (name === "due_in_date" && date <= addInput.posting_date) {
      console.log("not possible");
      addInput.due_in_date.setDate(addInput.posting_date.getDate() + 1);
      addNotify("404", "Due In Date invalid");
    } else {
      setAddInput({ ...addInput, [name]: date });
    }
  };

  const handleAddSubmit = (evt) => {
    evt.preventDefault();
    addRow(addInput);
    closeModal();
  };
  return (
    <>
      <Button className={styles.cudButtonEnabled} {...props} variant="outlined" onClick={openModal}>
        {/* <span style={{fontSize: "16px", textAlign: "center", display: "flex", justifyContent: "center"}}>
          <GrAdd size="16px" /> ADD
        </span> */}
        ADD
      </Button>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="draggable-dialog-title"
        fullWidth={true}
        maxWidth="lg"
        TransitionComponent={Transition}
        // className={styles.dialog}
        PaperProps={{
          className: styles.dialog,
        }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Add
        </DialogTitle>
        <form onSubmit={handleAddSubmit}>
          <DialogContent
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {addFormDetails.map((data, idx) =>
              data.type === "text" ? (
                <TextField
                  key={idx}
                  label={data.label}
                  id="margin-normal"
                  name={data.name}
                  className={styles.textField}
                  helperText={data.helperText}
                  onChange={handleAddInput}
                  InputProps={{
                    className: styles.input,
                  }}
                  required={true}
                />
              ) : (
                <LocalizationProvider key={idx} dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={data.label}
                    inputFormat="MM/dd/yyyy"
                    value={addInput[data.name]}
                    name={data.name}
                    onChange={(date) => handleAddDate(date, data.name)}
                    required={true}
                    renderInput={(params) => (
                      <TextField
                        required={true}
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
              )
            )}
          </DialogContent>
          <DialogActions className={styles.DialogActions}>
            <Button
              variant="outlined"
              className={styles.formButton}
              type="submit"
            >
              ADD
            </Button>
            <Button
              autoFocus
              variant="outlined"
              className={styles.formButton}
              onClick={closeModal}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddButton;
