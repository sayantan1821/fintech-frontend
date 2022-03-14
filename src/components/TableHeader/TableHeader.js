import React, { useState, useReducer} from "react";
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
  },
};



const TableHeader = ({ deleteRows, selected }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sl_no: "",
      invoice_currency: "",
      cust_payment_terms: ""
    }
  );
  function openModal() {
    setIsOpen(true);
  }
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      // display: "flex",
      // flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  }));
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const deletec = (e) => {
    e.preventDefault();
    deleteRows();
  };
  const classes = useStyles();
  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };
    let api = new DataService();
    api.updateRecord(formInput.sl_no, formInput.cust_payment_terms, formInput.invoice_currency).then((res) => {
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

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    setFormInput({
      sl_no: selected[0],
    })
  };

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
          <Button onClick={(e) => {}}>ADVANCE SEARCH</Button>
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
      >
        <form onSubmit={handleSubmit}>
        <div><TextField
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
          /></div>
          
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
    </div>
  );
};

export default TableHeader;
