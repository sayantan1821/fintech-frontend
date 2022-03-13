import React from "react";
import { Checkbox, Button, ButtonGroup } from "@material-ui/core";
const TableHeader = ({deleteRows}) => {
  const deletec = (e) => {
    e.preventDefault();
    deleteRows()
  }
  return (
    <div style={{ height: "8vh" }}>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button>ADD</Button>
        <Button>EDIT</Button>
        <Button onClick={(e) => {deletec(e)}}>DELETE</Button>
      </ButtonGroup>
    </div>
  );
};

export default TableHeader;
