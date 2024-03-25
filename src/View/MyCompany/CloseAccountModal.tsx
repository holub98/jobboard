import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { deleteAccount } from "~/api";

type Props = {
  token: string;
};
export const CloseAccountModal = ({ token }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = async () => {
    deleteAccount(token);
    setIsOpen(false);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <Delete />
      </IconButton>
      <Dialog open={isOpen}>
        <DialogTitle>Close account</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure to close account?</DialogContentText>
          <DialogContentText>All your data will be deleted?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button color="error" type="submit" onClick={onSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
