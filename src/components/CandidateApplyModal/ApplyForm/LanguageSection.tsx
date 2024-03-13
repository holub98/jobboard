import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ApplyType } from "../schema";
import { useState } from "react";

type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
export type LanguageType = {
  name: string;
  level: LanguageLevel;
};

type Props = {
  formContext: UseFormReturn<ApplyType>;
};
export const LanguageSection = ({ formContext }: Props) => {
  const { control, trigger } = formContext;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "languages",
  });
  const [value, setValue] = useState<LanguageType>({
    name: "",
    level: "B2",
  });

  const handleAdd = () => {
    if (value === null) {
      return;
    }

    append(value);
    setValue({
      name: "",
      level: "B2",
    });
  };
  const handleRemove = (index: number) => {
    remove(index), trigger("experience");
  };

  const handleLevel = (event: SelectChangeEvent<LanguageLevel>) => {
    const newLevel = event.target.value;
    setValue((prev) => ({ ...prev, level: newLevel as LanguageLevel }));
  };
  return (
    <Stack>
      <Typography>Language</Typography>

      {fields.map((field, index) => {
        return (
          <Stack key={field.id}>
            <Typography>{field.name}</Typography>
            <Typography>{field.level}</Typography>

            <Button onClick={() => handleRemove(index)}>Delete</Button>
          </Stack>
        );
      })}
      <Stack>
        <TextField
          label="Language"
          value={value.name}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Select label="Level" value={value.level} onChange={handleLevel}>
          <MenuItem value="A1">A1</MenuItem>
          <MenuItem value="A2">A2</MenuItem>
          <MenuItem value="B1">B1</MenuItem>
          <MenuItem value="B2">B2</MenuItem>
          <MenuItem value="C1">C1</MenuItem>
          <MenuItem value="C2">C2</MenuItem>
          <MenuItem value="Native">NATIVE</MenuItem>
        </Select>
      </Stack>
      <Button onClick={handleAdd}>Add</Button>
    </Stack>
  );
};
