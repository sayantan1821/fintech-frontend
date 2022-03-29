import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useStyles } from "./buttonStyles";
import IconButton from "@material-ui/core/IconButton";
const RefreshButton = ({
  setTableContent,
  setState,
  state,
  setPageNo,
  setRecordPerPage,
  setAdvanceInput,
}) => {
  const styles = useStyles();
  const handleRefresh = () => {
    setTableContent("mainTable");
    setPageNo(0);
    setRecordPerPage(10);
    setAdvanceInput({
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    });
    setState(state + 1);
  };
  return (
    <IconButton
      aria-label="refresh"
      onClick={handleRefresh}
      className={styles.Refresh}
      style={{padding: "6px 16px"}}
    >
      <FiRefreshCw />
    </IconButton>
  );
};

export default RefreshButton;
