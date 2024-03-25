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
import { useForm } from "react-hook-form";
import { OfferType, offerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteOffer } from "~/api/companyOffer";

type Props = {
  initialData: OfferType;
  offerId: string;
  token: string;
};

export const OfferDeleteModal = ({ initialData, offerId, token }: Props) => {
  const form = useForm<OfferType>({
    defaultValues: initialData,
    resolver: zodResolver(offerSchema),
  });
  const { reset } = form;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = async () => {
    deleteOffer(offerId, token);
    setIsOpen(false);
    reset();
  };
  const onClose = () => {
    setIsOpen(false);
    reset();
  };
  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <Delete />
      </IconButton>
      <Dialog open={isOpen}>
        <DialogTitle>Delete offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete {initialData.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="contained" onClick={onClose}>
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
