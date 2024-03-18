import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OfferType, offerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferForm } from "./OfferForm";
import { createOffer } from "~/api/companyOffer";

export const OfferCreateModal = () => {
  const form = useForm<OfferType>({
    defaultValues: {
      name: "",
      earnings: {
        from: "",
        to: "",
      },
      workDirection: "Office",
      requirements: [],
      description: "",
    },
    resolver: zodResolver(offerSchema),
  });
  const { reset } = form;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = async (data: OfferType) => {
    createOffer(data);
    reset();
    setIsOpen(false);
  };
  const onClose = () => {
    reset();
    setIsOpen(false);
  };
  return (
    <>
      <Button variant="contained" size="large" onClick={() => setIsOpen(true)}>
        <Add />
        Add offer
      </Button>
      <Dialog open={isOpen}>
        <DialogTitle>Create your offer</DialogTitle>
        <DialogContent>
          <OfferForm formContext={form} onSubmit={onSubmit} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="offer-form">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
