import { useState } from "react";
import { CompanyType } from "../schema";
import { UseFormReturn, useController } from "react-hook-form";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { breakTheme } from "~/theme";

const StackDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 16,
  alignItems: "center",
  [theme.breakpoints.down(breakTheme.breakpoints.values.md)]: {
    flexDirection: "column",
  },
}));

type Props = {
  formContext: UseFormReturn<CompanyType>;
  register: boolean;
};
export const InfoForm = ({ formContext, register }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
  } = formContext;
  const name = useController({
    control: control,
    name: "name",
  });
  const email = useController({
    control: control,
    name: "email",
  });
  const password = useController({
    control: control,
    name: "password",
  });

  return (
    <>
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
      <StackDiv>
        <TextField
          sx={{ width: "100%" }}
          label="Email"
          name={email.field.name}
          value={email.field.value}
          ref={email.field.ref}
          onBlur={email.field.onBlur}
          onChange={email.field.onChange}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        {register && (
          <TextField
            sx={{ width: "100%" }}
            label="Password"
            name={password.field.name}
            value={password.field.value}
            ref={password.field.ref}
            onBlur={password.field.onBlur}
            onChange={password.field.onChange}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsVisible((prev) => !prev)}>
                    {isVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </StackDiv>
    </>
  );
};
