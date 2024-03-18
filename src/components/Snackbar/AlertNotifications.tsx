import { Alert } from "@mui/material";
import { SnackbarContent, CustomContentProps, closeSnackbar } from "notistack";
import { forwardRef } from "react";

const alertVariant = (
  value: "default" | "error" | "success" | "warning" | "info"
) => {
  switch (value) {
    case "default":
      return "info";
    default:
      return value;
  }
};

export const AlertNotification = forwardRef<HTMLDivElement, CustomContentProps>(
  (props, ref) => {
    const { id, message, variant } = props;
    const handleClose = () => closeSnackbar(id);

    return (
      <SnackbarContent
        ref={ref}
        role="alert"
        style={{ justifyContent: "center" }}
        data-testid={"snackbar-content"}
      >
        <Alert
          variant="filled"
          ref={ref}
          severity={alertVariant(variant)}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);
