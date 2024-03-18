import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import { AlertNotification } from "./AlertNotifications";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles({
  root: {
    top: 34,
  },
});

export const SnackbarProvider = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <NotistackSnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      classes={{ containerRoot: classes.root }}
      Components={{
        default: AlertNotification,
        error: AlertNotification,
        info: AlertNotification,
        success: AlertNotification,
        warning: AlertNotification,
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};
