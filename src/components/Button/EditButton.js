import React from "react";
import { Button } from "@material-ui/core";

const EditButton = (props) => {
  return (
    <>
      <Button
        {...props}
        //   variant="outlined"
        // onClick={openEditModal}
        // disabled={selected.length == 1 ? false : true}
      >
        EDIT
      </Button>
    </>
  );
};

export default EditButton;
