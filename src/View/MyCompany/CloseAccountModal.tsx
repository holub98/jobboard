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

export const CloseAccountModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = async () => {
    deleteAccount();
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
          <Button variant="contained" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={onSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
