import React from "react";
import { Button } from "@material-ui/core";

const AddButton = (props) => {
  return (
    <>
      <Button
        {...props}
        //   variant="outlined"
        // onClick={() => {
        //   openAddModal();
        // }}
      >
        ADD
      </Button>
    </>
  );
};

export default AddButton;