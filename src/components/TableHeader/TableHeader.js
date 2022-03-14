import React, { useState, useReducer } from "react";
import {
  Input,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  FormHelperText,
  Icon,
  TextField,
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

const TableHeader = ({ deleteRows, selected, state, setRecords }) => {
  let api = new DataService();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [advanceModalIsOpen, setAdvanceIsOpen] = useState(false);
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
    setAdvanceIsOpen(true);
  };
  const advanceAfterOpenModal = () => {
    console.log("ok");
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
    evt.preventDefault();
    console.log(advanceInput);
    api
      .advancedSearch(
        advanceInput.doc_id,
        advanceInput.invoice_id,
        advanceInput.cust_number,
        advanceInput.buisness_year,
        0,
        10
      )
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
        state = state+1;
      });
    closeAdvanceModal();
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
          <Button>ADD</Button>
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
      <Modal
        isOpen={advanceModalIsOpen}
        onAfterOpen={advanceAfterOpenModal}
        onRequestClose={closeAdvanceModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className={classes.advanceTitle}>ADVANCE SEARCH</p>
        <form onSubmit={handleAdvanceSubmit}>
          <div>
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
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            SEARCH
          </Button>
          <Button
            type=""
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              closeAdvanceModal();
            }}
          >
            CANCEL
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default TableHeader;
