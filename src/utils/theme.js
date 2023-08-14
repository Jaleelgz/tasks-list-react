import { createTheme } from "@mui/material";
import { COLORS } from "../constants/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    disabled: {
      main: COLORS.DISABLED_D4,
    },
    white: {
      main: COLORS.WHITE,
    },
    black: {
      main: COLORS.BLACK,
    },
  },
});
