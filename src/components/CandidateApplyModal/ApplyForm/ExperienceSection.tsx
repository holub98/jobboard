import { Button, Stack, TextField, Typography, styled } from "@mui/material";
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
const StackDiv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  flexDirection: "column",
}));
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
    <Stack gap="16px">
      <Typography variant="h6">Experience</Typography>

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
              <Typography>{field.companyName}</Typography>
              <Typography>
                {field.dateFrom} -
                {field.dateTo === "" ? "present" : field.dateTo}
              </Typography>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography>{field.job}</Typography>
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
            label="Company name"
            value={value.companyName}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, companyName: e.target.value }))
            }
            sx={{ width: "100%" }}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Position"
            value={value.job}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, job: e.target.value }))
            }
          />
        </StackDiv>
        <StackDiv>
          <DatePicker
            sx={{ width: "100%" }}
            label="Date from"
            value={value.dateFrom ? new Date(value.dateFrom) : null}
            onChange={handleDateFromChange}
          />

          <DatePicker
            sx={{ width: "100%" }}
            label="Date to"
            value={value.dateTo ? new Date(value.dateTo) : null}
            onChange={handleDateToChange}
          />
        </StackDiv>
      </Stack>
      <Button onClick={handleAdd}>Add</Button>
    </Stack>
  );
};
