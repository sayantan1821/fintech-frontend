import React, { useState, useReducer, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import DataService from "../../services/DataService";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
  },
};

const TableHeader = ({
  deleteRows,
  selected,
  setRecords,
  setTableState,
  tableState,
  setAdvanceState,
  advanceState,
  advanceNotify,
  addNotify,
  updateNotify,
}) => {
  let api = new DataService();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [advanceModalIsOpen, setAdvanceIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editInput, setEditInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sl_no: "",
      invoice_currency: "",
      cust_payment_terms: "",
    }
  );
  const [advanceInput, setAdvanceInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    }
  );
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
  useEffect(() => {
    advanceState.active && handleAdvanceSubmit();
  }, [advanceState.pageNo, advanceState.recordPerPage]);

  //Modal styles
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    root: {
      padding: theme.spacing(3, 2),
    },
    container: {
      // display: "flex",
      // flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
      marginTop: 30,
    },
    advanceTitle: {
      fontSize: 30,
      fontWeight: 500,
    },
  }));

  //advance search modal controls
  const openAdvanceModal = () => {
    setAdvanceInput({
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    });
    setAdvanceIsOpen(true);
  };
  const closeAdvanceModal = () => {
    setAdvanceIsOpen(false);
  };
  const handleAdvanceInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setAdvanceInput({ [name]: newValue });
  };
  const handleAdvanceSubmit = (evt) => {
    evt && evt.preventDefault();
    // evt && setAdvanceState({
    //   ...advanceState,
    //   active: true,
    //   pageNo: 0,
    //   recordPerPage: 10,
    // })
    api
      .advancedSearch(
        advanceInput.doc_id,
        advanceInput.invoice_id,
        advanceInput.cust_number,
        advanceInput.buisness_year,
        advanceState.pageNo,
        advanceState.recordPerPage
      )
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
        setTableState({
          ...tableState,
          active: false,
        });
        setAdvanceState({
          ...advanceState,
          active: true,
          stateCount: advanceState.stateCount + 1,
        });
        evt && advanceNotify();
      });
    closeAdvanceModal();
  };

  //add modal controls
  const openAddModal = () => {
    setAddModalIsOpen(true);
  };
  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  // const getCount = async () => {
  //   // let x;
  //   // const res = await api.countRecord();
  //   // return res;
  //   // api.countRecord().then((res) => {
  //   //   setCount({
  //   //     c: res.data.count,
  //   //   });
  //   //   x = res.data.count;
  //   //   console.log(res.data); //ok
  //   //   return res.data;
  //   // });
  //   // console.log(x);
  // };
  const handleAddInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(newValue);
    setAddInput({ [name]: newValue });
  };
  const handleAddDate = (date, name) => {
    // console.log(date + "\t" + name);
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let convertedDate = `${year}-${month}-${day}`;
    setAddInput({ ...addInput, [name]: convertedDate });
    // console.log(addInput);
  };
  const handleAddSubmit = (evt) => {
    // if (typeof addInput.posting_date === "object")
    //   handleAddDate(addInput.posting_date, "posting_date");

    // var converted_posting_date,
    //   converted_baseline_create_date,
    //   converted_clear_date,
    //   converted_document_create_date,
    //   converted_due_in_date;
    // if (typeof addInput.posting_date === "object") {
    //   let month = String(addInput.posting_date.getMonth() + 1);
    //   let day = String(addInput.posting_date.getDate());
    //   const year = String(addInput.posting_date.getFullYear());

    //   if (month.length < 2) month = "0" + month;
    //   if (day.length < 2) day = "0" + day;

    //   converted_posting_date = `${year}-${month}-${day}`;
    // } else converted_posting_date = addInput.posting_date;
    // if (typeof addInput.baseline_create_date === "object") {
    //   let month = String(addInput.baseline_create_date.getMonth() + 1);
    //   let day = String(addInput.baseline_create_date.getDate());
    //   const year = String(addInput.baseline_create_date.getFullYear());

    //   if (month.length < 2) month = "0" + month;
    //   if (day.length < 2) day = "0" + day;

    //   converted_baseline_create_date = `${year}-${month}-${day}`;
    // } else converted_baseline_create_date = addInput.baseline_create_date;
    // if (typeof addInput.clear_date === "object") {
    //   let month = String(addInput.clear_date.getMonth() + 1);
    //   let day = String(addInput.clear_date.getDate());
    //   const year = String(addInput.clear_date.getFullYear());

    //   if (month.length < 2) month = "0" + month;
    //   if (day.length < 2) day = "0" + day;

    //   converted_clear_date = `${year}-${month}-${day}`;
    // } else converted_clear_date = addInput.clear_date;
    // if (typeof addInput.document_create_date === "object") {
    //   let month = String(addInput.document_create_date.getMonth() + 1);
    //   let day = String(addInput.document_create_date.getDate());
    //   const year = String(addInput.document_create_date.getFullYear());

    //   if (month.length < 2) month = "0" + month;
    //   if (day.length < 2) day = "0" + day;

    //   converted_document_create_date = `${year}-${month}-${day}`;
    // } else converted_document_create_date = addInput.document_create_date;
    // if (typeof addInput.due_in_date === "object") {
    //   let month = String(addInput.due_in_date.getMonth() + 1);
    //   let day = String(addInput.due_in_date.getDate());
    //   const year = String(addInput.due_in_date.getFullYear());

    //   if (month.length < 2) month = "0" + month;
    //   if (day.length < 2) day = "0" + day;

    //   converted_due_in_date = `${year}-${month}-${day}`;
    // } else converted_due_in_date = addInput.due_in_date;

    // setAddInput({
    //   ...addInput,
    //   posting_date: converted_posting_date,
    //   baseline_create_date: converted_baseline_create_date,
    //   clear_date: converted_clear_date,
    //   document_create_date: converted_document_create_date,
    //   due_in_date: converted_due_in_date,
    // });

    evt.preventDefault();
    console.log(addInput);
    api
      .addRecord(addInput)
      .then((res) => {
        addNotify(res.data.code, res.data.mssg);
      })
    closeAddModal();
  };

  //edit modal controls
  const openEditModal = () => {
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };
  const handleEditSubmit = (evt) => {
    evt.preventDefault();

    api
      .updateRecord(
        editInput.sl_no,
        editInput.cust_payment_terms,
        editInput.invoice_currency
      )
      .then((res) => {
        console.log("After updating data : ", res.data);
        updateNotify(editInput.sl_no);
      });
    setAdvanceState({
      ...advanceState,
      active: true,
      stateCount: advanceState.stateCount + 1,
    });
    closeEditModal();
  };
  const handleEditInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setEditInput({ [name]: newValue });
    setEditInput({
      sl_no: selected[0],
    });
  };

  //delete modal controls
  const deletec = (e) => {
    e.preventDefault();
    deleteRows();
  };

  const classes = useStyles();
  Modal.setAppElement("#root");
  return (
    <div
      style={{
        height: "8vh",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 30px",
        alignItems: "center",
      }}
    >
      <div>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button>PREDICT</Button>
          <Button>
            <pre>ANALYTICS VIEW</pre>
          </Button>
          <Button
            onClick={(e) => {
              openAdvanceModal();
            }}
          >
            <pre>ADVANCE SEARCH</pre>
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup
          variant="outlined"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => {
              openAddModal();
            }}
          >
            ADD
          </Button>
          <Button
            onClick={openEditModal}
            disabled={selected.length == 1 ? false : true}
          >
            EDIT
          </Button>
          <Button
            disabled={selected.length > 0 ? false : true}
            onClick={(e) => {
              deletec(e);
            }}
          >
            DELETE
          </Button>
        </ButtonGroup>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={advanceModalIsOpen}
        onClose={closeAdvanceModal}
      >
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
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAdvanceInput}
              required={false}
            />
            <TextField
              label="Customer No-(cust_number)"
              id="margin-normal"
              name="cust_number"
              // defaultValue="Total Open Amount"
              className={classes.textField}
              helperText="Enter Customer No-(cust_number)"
              onChange={handleAdvanceInput}
              required={false}
            />
            <TextField
              label="Invoice No-(invoice_id)"
              id="margin-normal"
              name="invoice_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Invoice No-(invoice_id)"
              onChange={handleAdvanceInput}
              required={false}
            />
            <TextField
              label="Business Year- (buisness_year)"
              id="margin-normal"
              name="buisness_year"
              // defaultValue="Total Open Amount"
              className={classes.textField}
              helperText="Enter Business Year- (buisness_year)"
              onChange={handleAdvanceInput}
              required={false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAdvanceModal} type="submit">
              SEARCH
            </Button>
            <Button onClick={closeAdvanceModal}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={addModalIsOpen}
        onClose={closeAddModal}
        aria-labelledby="draggable-dialog-title"
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Subscribe
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
                  className={classes.textField}
                  helperText={data.helperText}
                  onChange={handleAddInput}
                  // required={true}
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
                        // required={true}
                        // name={data.name}
                        // value={addInput[data.name]}
                        className={classes.textField}
                        // label={data.label}
                        // onChange={handleAddInput}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeAddModal}>
              Cancel
            </Button>
            <Button type="submit">ADD</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={editModalIsOpen}
        onClose={closeEditModal}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <TextField
              label="Invoice Currency"
              id="margin-normal"
              name="invoice_currency"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Invoice Currency"
              onChange={handleEditInput}
            />
            <TextField
              label="Cust Payment Terms"
              id="margin-normal"
              name="cust_payment_terms"
              // defaultValue="Total Open Amount"
              className={classes.textField}
              helperText="Enter Cust Payment Terms"
              onChange={handleEditInput}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              UPDATE
            </Button>
            <Button onClick={closeEditModal}>Close</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default TableHeader;
