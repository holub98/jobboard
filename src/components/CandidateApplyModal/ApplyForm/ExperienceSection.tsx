import { Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
import { ApplyType } from "../schema";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: Date;
  dateTo?: Date;
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
  const [value, setValue] = useState<ExperienceType>({});

  const handleAdd = (value: ExperienceType) => {
    if (value === null) {
      return;
    }

    append(value);
    setValue({});
  };
  const handleRemove = (index: number) => {
    remove(index), trigger("experience");
  };
  return (
    <Stack>
      <Typography>Experience</Typography>

      {fields.map((field, index) => {
        return (
          <Stack key={field.id}>
            <Typography>{field.companyName}</Typography>
            <Typography>{field.job}</Typography>
            {/* <Typography>{field.dateFrom}</Typography> */}
            <Typography>
              {field.dateTo === undefined ? "preset" : field.dateTo.getDate()}
            </Typography>
            <Button onClick={() => handleRemove(index)}>Delete</Button>
          </Stack>
        );
      })}
      <Stack>
        <TextField
          label="Company name"
          value={value?.companyName}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, companyName: e.target.value }))
          }
        />
        <TextField
          label="Position"
          value={value?.job}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, job: e.target.value }))
          }
        />

        <DatePicker
          label="Date from"
          value={value?.dateFrom}
          onChange={() =>
            setValue((prev) => ({ ...prev, dateFrom: value.dateFrom }))
          }
        />

        {/* <DatePicker
          label="Date to"
          value={value?.dateTo}
          onChange={() =>
            setValue((prev) => ({ ...prev, dateFrom: value.dateTo }))
          }
        /> */}
      </Stack>
      <Button onClick={handleAdd(value)}>Add</Button>
    </Stack>
  );
};
