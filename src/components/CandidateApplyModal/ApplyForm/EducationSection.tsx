import { Button, Stack, TextField, Typography } from "@mui/material";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ApplyType } from "../schema";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

export type EducationType = {
  schoolName: string;
  faculty: string;
  dateFrom: string;
  dateTo: string;
};
type Props = {
  formContext: UseFormReturn<ApplyType>;
};
export const EducationSection = ({ formContext }: Props) => {
  const { control, trigger } = formContext;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "education",
  });
  const [value, setValue] = useState<EducationType>({
    schoolName: "",
    faculty: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleAdd = () => {
    if (value === null) {
      return;
    }

    append(value);
    setValue({
      schoolName: "",
      faculty: "",
      dateFrom: "",
      dateTo: "",
    });
  };
  const handleRemove = (index: number) => {
    remove(index), trigger("experience");
  };
  const handleDateFromChange = (newDateFrom: Date | null) => {
    setValue((prev) => ({
      ...prev,
      dateFrom: newDateFrom?.toISOString().split("T")[0] || "", // Konwertuj datę na format YYYY-MM-DD
    }));
  };

  const handleDateToChange = (newDateTo: Date | null) => {
    setValue((prev) => ({
      ...prev,
      dateTo: newDateTo?.toISOString().split("T")[0] || "", // Konwertuj datę na format YYYY-MM-DD
    }));
  };
  return (
    <Stack>
      <Typography>Education</Typography>

      {fields.map((field, index) => {
        return (
          <Stack key={field.id}>
            <Typography>{field.schoolName}</Typography>
            <Typography>{field.faculty}</Typography>
            <Typography>{field.dateFrom}</Typography>
            <Typography>
              {field.dateTo === "" ? "preset" : field.dateTo}
            </Typography>
            <Button onClick={() => handleRemove(index)}>Delete</Button>
          </Stack>
        );
      })}
      <Stack>
        <TextField
          label="School name"
          value={value.schoolName}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, schoolName: e.target.value }))
          }
        />
        <TextField
          label="Faculty"
          value={value.faculty}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, faculty: e.target.value }))
          }
        />

        <DatePicker
          label="Date from"
          value={value.dateFrom ? new Date(value.dateFrom) : null}
          onChange={handleDateFromChange}
        />

        <DatePicker
          label="Date to"
          value={value.dateTo ? new Date(value.dateTo) : null}
          onChange={handleDateToChange}
        />
      </Stack>
      <Button onClick={handleAdd}>Add</Button>
    </Stack>
  );
};
