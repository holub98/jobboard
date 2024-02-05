import { createTheme } from "@mui/material";

export const breakTheme = createTheme({
  breakpoints: {
    values: {
      xs: 360,
      sm: 480,
      md: 640,
      lg: 1024,
      xl: 1200,
    },
  },
});
