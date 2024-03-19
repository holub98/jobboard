import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { OfferType } from "./schema";
import { UseFormReturn, useController } from "react-hook-form";
import { tech } from "~/utils/technologies";
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
import StarterKit from "@tiptap/starter-kit";
import { useRef } from "react";
import { EditorEvents } from "@tiptap/core";

type Props = {
  initialValue?: OfferType;
  formContext: UseFormReturn<OfferType>;
  onSubmit: (value: OfferType) => void;
};
export const OfferForm = ({ formContext, initialValue, onSubmit }: Props) => {
  const rteRef = useRef<RichTextEditorRef>(null);

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = formContext;

  const name = useController({
    control: control,
    name: "name",
  });
  const earnFrom = useController({
    control: control,
    name: "earnings.from",
  });
  const earnTo = useController({
    control: control,
    name: "earnings.to",
  });

  const destination = useController({
    control: control,
    name: "workDirection",
  });

  const requirements = useController({
    control: control,
    name: "requirements",
  });

  const handleRteOnCreate = (
    field: "description",
    props: EditorEvents["create"]
  ) => {
    if (initialValue === undefined || initialValue[field] === undefined) {
      return;
    }
    props.editor.commands.setContent(initialValue[field]);
  };

  const handleRteOnBlur = (
    field: "description",
    props: EditorEvents["blur"]
  ) => {
    setValue(field, props.editor.getHTML());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      id="offer-form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        paddingTop: "16px",
      }}
    >
      <TextField
        label="Name"
        name={name.field.name}
        value={name.field.value}
        ref={name.field.ref}
        onBlur={name.field.onBlur}
        onChange={name.field.onChange}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Stack
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
          flexDirection: "column",
          gap: "4px",
        })}
      >
        <TextField
          label="Earnings from"
          name={earnFrom.field.name}
          value={earnFrom.field.value}
          ref={earnFrom.field.ref}
          onBlur={earnFrom.field.onBlur}
          onChange={earnFrom.field.onChange}
          type="number"
          inputProps={{
            step: "1",
            min: 0,
          }}
          error={!!errors.earnings?.from}
          helperText={errors.earnings?.from?.message}
        />
        <TextField
          label="Earnings to"
          name={earnTo.field.name}
          value={earnTo.field.value}
          ref={earnTo.field.ref}
          onBlur={earnTo.field.onBlur}
          onChange={earnTo.field.onChange}
          error={!!errors.earnings?.to}
          helperText={errors.earnings?.to?.message}
          type="number"
          inputProps={{
            step: "1",
            min: earnFrom.field.value,
          }}
          disabled={!earnFrom.field.value || earnFrom.field.value === "0"}
        />
      </Stack>
      <FormControl>
        <InputLabel>Work place</InputLabel>
        <Select
          label="Work place"
          name={destination.field.name}
          value={destination.field.value}
          ref={destination.field.ref}
          onBlur={destination.field.onBlur}
          defaultValue={destination.field.value}
          onChange={(e) => destination.field.onChange(e.target.value)}
        >
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="PartlyRemote">Hybrid</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        filterSelectedOptions
        options={tech}
        value={requirements.field.value}
        ref={requirements.field.ref}
        onBlur={requirements.field.onBlur}
        onChange={(_, newValue) => {
          if (newValue !== null) requirements.field.onChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Requirements"
            placeholder="Requirements"
            error={!!errors.requirements}
            helperText={errors.requirements?.message}
          />
        )}
      />

      <RichTextEditor
        ref={rteRef}
        onCreate={(props) => handleRteOnCreate("description", props)}
        onBlur={(props) => handleRteOnBlur("description", props)}
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
  );
};
