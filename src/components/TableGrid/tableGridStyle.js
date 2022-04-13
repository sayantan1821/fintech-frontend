import { alpha, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontSize: "20pt",
    // background: "#2D4250",
    // color: "white",
    "& .MuiInputBase_root": {
      color: "white",
    },
    background: "#283D4A !important",
  },
  gridContainer: {
    height: "8vh",
    display: "flex",
    justifyContent: "space-between",
    // margin: "0 30px",
    padding: "0 30px",
    alignItems: "center",
    background: "#283D4A !important",
  },
  paper: {
    width: "100%",
    marginBottom: 50,
    background: "#283D4A !important",
    color: "white",
  },
  Table_Container: {
    // display: "none",
    height: "76vh",
  },

  table: {
    root: {
      "& .Mui-selected": {
        backgroundColor: "red !important",
      },
    },
  },
  checkbox: {
    "&$checked": {
      color: "rgba(0, 0, 0, 0.54) !important",
    },
  },
  checked: {
    color: "yellow !important",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  HeadTableRow: {
    "&:hover": {
      backgroundColor: "#21323c !important",
    },
    backgroundColor: "#21323c",
    color: "white",
    "& > .MuiTableCell-root": {
      color: "white",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#034269",
      "& > .MuiTableCell-root": {
        color: "white",
      },
    },
  },
  HeadTableCell: {
    background: "#21323c",
    position: "sticky",
    zIndex: "10",
    top: "0vh",
  },
  headCellLabel: {
    position: "sticky",
    "&:hover": {
      color: "white !important",
    },
    "&:selected": {
      color: "white !important",
    },
  },
  "MuiTableSortLabel-active": {
    color: "white !important",
  },
  MuiTableRow: {
    "&:hover": {
      backgroundColor: "#06588ae3 !important",
    },
    height: "47px",
    backgroundColor: "#283D4A",
    color: "white",
    "& > .MuiTableCell-root": {
      color: "white",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#034269",
      "& > .MuiTableCell-root": {
        color: "white",
      },
    },
  },
  root: {
    // color: '#14AFF1',
    "&$indeterminate": {
      color: "white",
    },
    // "&$unselected": {
    //   color: "#14AFF1",
    // },
  },
  indeterminate: {},
  MuiCheckbox: {
    color: "#14AFF1",
  },
  TableCell: {
    fontSize: "13px",
    padding: "5px",
    height: "5px",
  },
  tableTool: {
    margin: "0 15px",
    display: "flex",
    justifyContent: "end",
    fontSize: "13px",
  },
  footerIcon: {
    background: "white",
    borderRadius: "15px",
  },
  scrollTrackHorizontal: {
    background: "transparent",
    bottom: "2px",
    width: "100%",
  },
  scrollTrackVertical: {
    background: "transparent",
    right: "2px",
    top: "2px",
    bottom: "2px",
    width: "5px",
  },
  scrollThumbHorizontal: {
    height: "4px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#ffffff4f",
    "&:hover": {
      background: "#fff",
    },
  },
  scrollThumbVertical: {
    width: "4px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
    backgroundColor: "#ffffff4f",
    "&:hover": {
      background: "#fff",
    },
  },
}));