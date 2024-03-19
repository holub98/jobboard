import { Stack, TextField, styled } from "@mui/material";
import { UseFormReturn, useController } from "react-hook-form";
import { CompanyType } from "../schema";

const StackDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 16,
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

type Props = {
  formContext: UseFormReturn<CompanyType>;
};

export const LocalizationForm = ({ formContext }: Props) => {
  const {
    control,
    formState: { errors },
  } = formContext;
  const country = useController({
    control: control,
    name: "localization.country",
  });
  const city = useController({
    control: control,
    name: "localization.city",
  });
  const zipCode = useController({
    control: control,
    name: "localization.zipCode",
  });
  const street = useController({
    control: control,
    name: "localization.street",
  });
  const number = useController({
    control: control,
    name: "localization.number",
  });

  return (
    <Stack gap="16px">
      <StackDiv>
        <TextField
          sx={{ width: "100%" }}
          label="City"
          name={city.field.name}
          value={city.field.value}
          ref={city.field.ref}
          onBlur={city.field.onBlur}
          onChange={city.field.onChange}
          error={!!errors.localization?.city}
          helperText={errors.localization?.city?.message}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Country"
          name={country.field.name}
          value={country.field.value}
          ref={country.field.ref}
          onBlur={country.field.onBlur}
          onChange={country.field.onChange}
          error={!!errors.localization?.country}
          helperText={errors.localization?.country?.message}
        />
      </StackDiv>
      <StackDiv>
        <TextField
          sx={{ width: "100%" }}
          label="Street"
          name={street.field.name}
          value={street.field.value}
          ref={street.field.ref}
          onBlur={street.field.onBlur}
          onChange={street.field.onChange}
          error={!!errors.localization?.street}
          helperText={errors.localization?.street?.message}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Number"
          name={number.field.name}
          value={number.field.value}
          ref={number.field.ref}
          onBlur={number.field.onBlur}
          onChange={number.field.onChange}
          error={!!errors.localization?.number}
          helperText={errors.localization?.number?.message}
        />
      </StackDiv>
      <StackDiv>
        <TextField
          sx={(theme) => ({
            width: "calc(50% - 8px)",
            [theme.breakpoints.down("md")]: {
              width: "100%",
            },
          })}
          label="Zip code"
          name={zipCode.field.name}
          value={zipCode.field.value}
          ref={zipCode.field.ref}
          onBlur={zipCode.field.onBlur}
          onChange={zipCode.field.onChange}
          error={!!errors.localization?.zipCode}
          helperText={errors.localization?.zipCode?.message}
        />
      </StackDiv>
    </Stack>
  );
};
