import { Button, Stack, TextField, Typography, styled } from "@mui/material";
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
const StackDiv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  flexDirection: "column",
}));
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
            <Stack
              sx={(theme) => ({
                [theme.breakpoints.up("sm")]: {
                  justifyContent: "space-between",
                  flexDirection: "row",
                },
                flexDirection: "column",
              })}
            >
              <Typography>{field.schoolName}</Typography>
              <Typography>
                {field.dateFrom} -{" "}
                {field.dateTo === "" ? "preset" : field.dateTo}
              </Typography>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography>{field.faculty}</Typography>
              <Button color="error" onClick={() => handleRemove(index)}>
                Delete
              </Button>
            </Stack>
          </Stack>
        );
      })}
      <Stack gap="16px">
        <StackDiv>
          <TextField
            label="School name"
            value={value.schoolName}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, schoolName: e.target.value }))
            }
            sx={{ width: "100%" }}
          />
          <TextField
            label="Faculty"
            value={value.faculty}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, faculty: e.target.value }))
            }
            sx={{ width: "100%" }}
          />
        </StackDiv>
        <StackDiv>
          <DatePicker
            label="Date from"
            value={value.dateFrom ? new Date(value.dateFrom) : null}
            onChange={handleDateFromChange}
            sx={{ width: "100%" }}
          />

          <DatePicker
            label="Date to"
            value={value.dateTo ? new Date(value.dateTo) : null}
            onChange={handleDateToChange}
            sx={{ width: "100%" }}
          />
        </StackDiv>
      </Stack>
      <Button onClick={handleAdd}>Add</Button>
    </Stack>
  );
};
