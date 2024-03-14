import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ApplyType, applySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyCandidate } from "~/api";
import { breakTheme } from "~/theme";
import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonItalic,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { EditorEvents } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { tech } from "~/state/technologies";
import { ExperienceSection } from "./ApplyForm/ExperienceSection";
import { EducationSection } from "./ApplyForm/EducationSection";
import { LanguageSection } from "./ApplyForm/LanguageSection";

type Props = {
  offerId: string;
  offerName: string;
  companyName: string;
};

const StackDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 16,
  alignItems: "center",
  [theme.breakpoints.down(breakTheme.breakpoints.values.md)]: {
    flexDirection: "column",
  },
}));

export const CandidateApplyModal = ({
  offerId,
  companyName,
  offerName,
}: Props) => {
  const form = useForm<ApplyType>({
    defaultValues: {
      offerId: offerId,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experience: [],
      education: [],
      languages: [],
      stack: [],
      another: "",
    },
    resolver: zodResolver(applySchema),
  });

  const rteRef = useRef<RichTextEditorRef>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = form;
  const handleRteOnCreate = (props: EditorEvents["create"]) => {
    props.editor.commands.setContent({ ...register("another") });
  };

  const handleRteOnBlur = (field: "another", props: EditorEvents["blur"]) => {
    setValue(field, props.editor.getHTML());
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = (data: ApplyType) => {
    applyCandidate(offerId, data);
    setIsOpen(false);

    console.log(data);
  };
  const onClose = () => {
    setIsOpen(false), reset();
  };

  console.log(errors);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Apply</Button>
      <Dialog open={isOpen}>
        <DialogTitle>
          Application for {offerName} in {companyName}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="apply-form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              gap: 2,

              paddingTop: "16px",
            }}
          >
            <StackDiv>
              <TextField
                sx={{ width: "100%" }}
                label="First name"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                sx={{ width: "100%" }}
                label="Last name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </StackDiv>
            <StackDiv>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                sx={{ width: "100%" }}
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </StackDiv>
            <ExperienceSection formContext={form} />
            <EducationSection formContext={form} />
            <LanguageSection formContext={form} />
            <FormControl>
              <Controller
                name="stack"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    onChange={(_, newValue) => {
                      if (newValue !== null) field.onChange(newValue);
                    }}
                    onBlur={field.onBlur}
                    multiple
                    filterSelectedOptions
                    options={tech}
                    value={field.value || undefined}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Stack"
                        placeholder="Stack"
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <RichTextEditor
              ref={rteRef}
              onCreate={(props) => handleRteOnCreate(props)}
              onBlur={(props) => handleRteOnBlur("another", props)}
              extensions={[StarterKit]}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                  <MenuButtonBulletedList />
                  <MenuButtonBlockquote />
                  <MenuButtonUndo />
                  <MenuButtonRedo />
                  <MenuButtonCodeBlock />
                  <MenuButtonCode />
                </MenuControlsContainer>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="apply-form">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
