import React from "react";
import { Button } from "@material-ui/core";
const AnalyticsButton = (props) => {
  return (
    <>
      <Button {...props}>
        <pre>ANALYTICS VIEW</pre>
      </Button>
    </>
  );
};

export default AnalyticsButton;
