import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./buttonStyles";

const PredictButton = ({ selected, ...props }) => {
  const styles = useStyles();
  return (
    <>
      <Button
        variant="contained"
        style={{
          background: selected.length > 0 ? "#14AFF1" : "#10101061",
          color: "white",
        }}
        disabled={selected.length == 1 ? false : true}
        className={styles.predictButton}
        {...props}
      >
        PREDICT
      </Button>
    </>
  );
};

export default PredictButton;
