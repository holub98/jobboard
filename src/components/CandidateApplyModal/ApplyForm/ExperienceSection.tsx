import { Button, Stack, TextField, Typography } from "@mui/material";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ApplyType } from "../schema";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: string;
  dateTo: string;
};
type Props = {
  formContext: UseFormReturn<ApplyType>;
};
export const ExperienceSection = ({ formContext }: Props) => {
  const { control, trigger } = formContext;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "experience",
  });
  const [value, setValue] = useState<ExperienceType>({
    companyName: "",
    job: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleAdd = () => {
    if (value === null) {
      return;
    }

    append(value);
    setValue({
      companyName: "",
      job: "",
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
      <Typography>Experience</Typography>

      {fields.map((field, index) => {
        return (
          <Stack key={field.id}>
            <Typography>{field.companyName}</Typography>
            <Typography>{field.job}</Typography>
            <Typography>{field.dateFrom}</Typography>
            <Typography>
              {field.dateTo === undefined ? "preset" : field.dateTo}
            </Typography>
            <Button onClick={() => handleRemove(index)}>Delete</Button>
          </Stack>
        );
      })}
      <Stack>
        <TextField
          label="Company name"
          value={value.companyName}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, companyName: e.target.value }))
          }
        />
        <TextField
          label="Position"
          value={value.job}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, job: e.target.value }))
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
