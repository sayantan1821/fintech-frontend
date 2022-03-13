import React from "react";
import { Checkbox, Button, ButtonGroup } from "@material-ui/core";
const TableHeader = ({ deleteRows }) => {
  const deletec = (e) => {
    e.preventDefault();
    deleteRows();
  };
  return (
    <div
      style={{
        height: "8vh",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 30px",
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
          <Button>EDIT</Button>
          <Button
            onClick={(e) => {
              deletec(e);
            }}
          >
            DELETE
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TableHeader;
