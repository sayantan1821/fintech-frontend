import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#14AFF1",
    },
    secondary: {
      main: "#ff0000",
    },
  },
  MuiSvgIcon: {
    colorPrimary: {
      color: ["white", "!important"],
    },
    colorSecondary: {
      color: ["#d5d7d8", "!important"],
    },
  },
});
