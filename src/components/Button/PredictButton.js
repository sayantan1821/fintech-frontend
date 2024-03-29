import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./buttonStyles";

const PredictButton = ({ selected, getPrediction, selectedDoc, ...props }) => {

  const styles = useStyles();
  return (
    <>
      <Button
        variant="contained"
        style={{
          background: selectedDoc.length > 0 ? "#14AFF1" : "#10101061",
          color: selectedDoc.length > 0 ? "white" : "#4a4949",
        }}
        disabled={selectedDoc.length > 0 ? false : true}
        className={styles.predictButton}
        {...props}
        onClick={getPrediction}
      >
        PREDICT
      </Button>
    </>
  );
};

export default PredictButton;
