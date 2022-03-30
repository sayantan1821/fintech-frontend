import { alpha, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  dialog: {
    backgroundColor: "#2A3E4C",
    color: "white",
  },
  container: {
    // display: "flex",
    // flexWrap: "wrap"
  },
  DialogContent: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
  },
  DialogContentText: {
    color: "white",
  },
  textField: {
    margin: theme.spacing(1),
    padding: "5px",
    borderRadius: "5px",
    // marginRight: theme.spacing(1),
    // width: 300,
    // marginTop: 30,
    // color: "white",
    width: 300,
    height: 50,
    // marginLeft: "auto",
    // marginRight: "auto",
    paddingBottom: 0,
    // margin: "5px",
    fontWeight: 500,
    background: "white",
  },
  input: {
    color: "white !important",
  },
  DialogActions: {
    marginTop: "10px",
    width: "full",
    background: "transparent",
  },
  analyticsDateContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
  },
  formButton: {
    color: "white",
    border: "2px solid white",
    margin: "auto",
    padding: "10px 22%",
  },
  advanceTitle: {
    fontSize: 30,
    fontWeight: 500,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffffffb3",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    marginLeft: 0,
    width: "300px !important",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "2px solid #14AFF1",
    maxWidth: "100% !important",
    // width: "500px"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  Refresh: {
    padding: theme.spacing(1, 2),
    border: "2px solid #14AFF1",
    color: "white",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    justifyContent: "center",
  },
  advanceButton: {
    // background: "#2D4250",
    color: "white",
    border: "2px solid #14AFF1",
    padding: "5px 8px",
  },
  appBar: {
    position: "relative",
    background: "#2D4250 !important",
  },
  analyticsTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
  },
  backIcon: {
    color: "white",
  },
  analyticsButton: {
    color: "white",
  },
  predictButton: {},
  analyticsDialogContent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  cudButtonEnabled: {
    color: "white",
    border: "2px solid #14AFF1",
    width: "200px",
    maxWidth: "100%",
  },
  cudButtonDisabled: {
    color: "white !important",
    // border: "2px solid transparent",
    width: "200px",
    maxWidth: "100%",
  },
}));
