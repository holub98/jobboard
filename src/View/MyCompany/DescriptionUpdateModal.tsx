import { CompanyType, companySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CompanyFullType, updateCompany } from "~/api";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { DescriptionForm } from "./Form/DescriptionForm";
type Props = {
  initialData: CompanyFullType;
};

export const DescriptionUpdateModal = ({ initialData }: Props) => {
  const form = useForm<CompanyType>({
    defaultValues: initialData,
    resolver: zodResolver(companySchema),
  });
  const { reset, handleSubmit } = form;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (data: CompanyType) => {
    updateCompany(data);
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
        <Edit />
      </IconButton>
      <Dialog open={isOpen}>
        <DialogTitle>Update company description</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="description-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DescriptionForm formContext={form} initialValue={initialData} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="description-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
