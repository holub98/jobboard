import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { AlertNotification } from "./AlertNotifications";

type Props = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: Props) => {
  return (
    <NotistackSnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
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
