import { alpha, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      fontSize: "20pt",
    },
    paper: {
      width: "100%",
      marginBottom: 50,
    },
    Table_Container: {
        // display: "none",
        height: "77vh",
    },
    
    table: {
        root: {
          "& .Mui-selected": {
            backgroundColor: "red !important"
          }
        }
      }, 
    // MuiTableRow: {
    //     root: {
    //       '&$selected': {
    //         backgroundColor: 'yellow !important' 
    //       }
    //     }
    //   },
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
    MuiTableRow: {
        "&:hover": {
            backgroundColor: "blue !important"
          },
        backgroundColor: "#283D4A",
        color: "white",
        "& > .MuiTableCell-root": {
            // backgroundColor: "#283D4A",
            color: "white",
          },
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: "red",
        "& > .MuiTableCell-root": {
          color: "white",
        },
      },
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
  }));