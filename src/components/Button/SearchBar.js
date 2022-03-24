import React from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./buttonStyles";
import { alpha, makeStyles } from "@material-ui/core/styles";

const SearchBar = ({
  setTableContent,
  advanceInput,
  setAdvanceInput,
  setState,
  state,
  setPageNo,
  setRecordPerPage,
  ...props
}) => {
  const styles = useStyles();
  const handleInput = (evt) => {
    evt.preventDefault();
    setAdvanceInput({
      doc_id: "",
      cust_number: evt.target.value,
      invoice_id: "",
      buisness_year: "",
    });
    setTableContent("advanceTable");
    setPageNo(0);
    setRecordPerPage(10);
    setState(state + 1);
  };
  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Customer No."
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        value={advanceInput.cust_number}
        onChange={handleInput}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default SearchBar;
