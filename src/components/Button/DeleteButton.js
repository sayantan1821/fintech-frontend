import React from "react";
import { Button } from "@material-ui/core";

const DeleteButton = (props) => {
  return (
    <>
      <Button
        {...props}
        //   variant="outlined"
        // disabled={selected.length > 0 ? false : true}
        // onClick={(e) => {
        //   deletec(e);
        // }}
      >
        DELETE
      </Button>
    </>
  );
};

export default DeleteButton;
