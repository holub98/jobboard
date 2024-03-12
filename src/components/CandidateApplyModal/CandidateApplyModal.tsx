import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ApplyType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema } from "~/View/ComapnyJobOfferts/schema";
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
import { DatePicker } from "@mui/x-date-pickers";
import { ExperienceSection } from "./ApplyForm/ExperienceSection";

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
    resolver: zodResolver(offerSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = form;

  const {
    fields: educations,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: control,
    name: "education",
  });
  const {
    fields: languages,
    append: addLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: control,
    name: "languages",
  });

  const rteRef = useRef<RichTextEditorRef>(null);

  const handleRteOnCreate = (props: EditorEvents["create"]) => {
    props.editor.commands.setContent({ ...register("another") });
  };

  const handleRteOnBlur = (field: "another", props: EditorEvents["blur"]) => {
    setValue(field, props.editor.getHTML());
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onSubmit = (data: ApplyType) => {
    applyCandidate(offerId, data);
  };
  const onClose = () => {
    setIsOpen(false), reset();
  };
  console.log(errors, offerId);

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
            <Stack>
              <Typography>Education</Typography>

              {educations.map((field, index) => {
                return (
                  <Stack key={field.id}>
                    <Typography>{`educations.${index}.schoolName`}</Typography>
                    <Typography>{`educations.${index}.faculty`}</Typography>
                    <Typography>{`educations.${index}.dateFrom`}</Typography>
                    <Typography>{`educations.${index}.dateTo`}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Stack>
              <Typography>Languages</Typography>

              {languages.map((field, index) => {
                return (
                  <Stack key={field.id}>
                    <Typography>{`languages.${index}.name`}</Typography>
                    <Typography>{`languages.${index}.level`}</Typography>
                  </Stack>
                );
              })}
            </Stack>
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
