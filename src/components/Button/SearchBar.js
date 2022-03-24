import React from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./buttonStyles";
import { alpha, makeStyles } from "@material-ui/core/styles";



const SearchBar = () => {
  const styles = useStyles();
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
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default SearchBar;
