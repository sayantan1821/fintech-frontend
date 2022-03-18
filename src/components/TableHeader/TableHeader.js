import React, { useState, useReducer, useEffect } from "react";
import {
  Input,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  FormHelperText,
  Icon,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Draggable,
  Paper,
  Box,
} from "@material-ui/core";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import DataService from "../../services/DataService";

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
  setAdvanceState,
  advanceState,
}) => {
  let api = new DataService();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [advanceModalIsOpen, setAdvanceIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [formInput, setFormInput] = useReducer(
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
  const [addInput, setAddInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    }
  );

  useEffect(() => {
    handleAdvanceSubmit();
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
  const advanceAfterOpenModal = () => {};
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
    console.log(advanceInput);
    advanceState &&
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
          setAdvanceState({
            ...advanceState,
            active: true,
            stateCount: advanceState.stateCount + 1,
          });
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
  const handleAddInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    console.log(newValue);
    setAddInput({ [name]: newValue });
  };
  const handleAddSubmit = (evt) => {
    evt.preventDefault();
    console.log("submitted");
  };

  //edit modal controls
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  const deletec = (e) => {
    e.preventDefault();
    deleteRows();
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    let data = { formInput };
    api
      .updateRecord(
        formInput.sl_no,
        formInput.cust_payment_terms,
        formInput.invoice_currency
      )
      .then((res) => {
        console.log("After updating data : ", res.data);
      });
    console.log(data);
    setAdvanceState({
      ...advanceState,
      active: true,
      stateCount: advanceState.stateCount + 1,
    });
    closeModal();
    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(response => console.log("Success:", JSON.stringify(response)))
    //   .catch(error => console.error("Error:", error));
  };
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    setFormInput({
      sl_no: selected[0],
    });
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
          <Button>ANALYTICS VIEW</Button>
          <Button
            onClick={(e) => {
              openAdvanceModal();
            }}
          >
            ADVANCE SEARCH
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup
          variant="contained"
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
            onClick={openModal}
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Invoice Currency"
              id="margin-normal"
              name="invoice_currency"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Invoice Currency"
              onChange={handleInput}
            />
            <TextField
              label="Cust Payment Terms"
              id="margin-normal"
              name="cust_payment_terms"
              // defaultValue="Total Open Amount"
              className={classes.textField}
              helperText="Enter Cust Payment Terms"
              onChange={handleInput}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            UPDATE
          </Button>
        </form>
      </Modal>

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
            <Button onClick={closeAdvanceModal} type="submit">SEARCH</Button>
            <Button onClick={closeAdvanceModal}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={addModalIsOpen}
        onClose={closeAddModal}
        // PaperComponent={PaperComponent}
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
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
            <TextField
              label="Document Id-(doc_id)"
              id="margin-normal"
              name="doc_id"
              // defaultValue="Invoice Currency"
              className={classes.textField}
              helperText="Enter Document Id-(doc_id)"
              onChange={handleAddInput}
              required={false}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeAddModal}>
              Cancel
            </Button>
            <Button onClick={() => closeAddModal()} type="submit">
              ADD
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default TableHeader;
