import React from "react";
import { Button } from "@material-ui/core";
const AdvanceSearchButton = (props) => {
  return (
    <>
      <Button
        {...props}
        // onClick={(e) => {
        //   openAdvanceModal();
        // }}
      >
        <pre>ADVANCE SEARCH</pre>
      </Button>
    </>
  );
};

export default AdvanceSearchButton;
