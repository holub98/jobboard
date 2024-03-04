import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType, registerSchema } from "./schema";
import { registerCompany } from "../../api/company";
import { breakTheme } from "../../theme";
import { useNavigate } from "react-router-dom";

const StackDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 16,
  alignItems: "center",
  [theme.breakpoints.down(breakTheme.breakpoints.values.md)]: {
    flexDirection: "column",
  },
}));

export const RegisterView = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterType) => {
    registerCompany(data);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          boxShadow: "0px 0px 010px 0px #D2D2E0",
          padding: "48px 24px 48px 24px",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" fontWeight="bold" color="text.secondary">
          Register
        </Typography>
        <Stack gap={2} width="100%">
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
              label="Password"
              {...register("password")}
              type={isVisible ? "text" : "password"}
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
          </StackDiv>

          <Typography variant="h6">Localization</Typography>
          <StackDiv>
            <TextField
              sx={{ width: "100%" }}
              label="Country"
              {...register("localization.country")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              sx={{ width: "100%" }}
              label="City"
              {...register("localization.city")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </StackDiv>
          <StackDiv>
            <TextField
              sx={{ width: "100%" }}
              label="Street"
              {...register("localization.street")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              sx={{ width: "100%" }}
              label="Number"
              {...register("localization.number")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </StackDiv>
          <StackDiv>
            <TextField
              sx={(theme) => ({
                width: "calc(50% - 8px)",
                [theme.breakpoints.down(breakTheme.breakpoints.values.md)]: {
                  width: "100%",
                },
              })}
              label="Zip code"
              {...register("localization.zipCode")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </StackDiv>
          <Button
            size="large"
            variant="contained"
            color="success"
            type="submit"
          >
            Sign up
          </Button>
        </Stack>
        <StackDiv>
          <Typography>Do you have already an account?</Typography>
          <Button size="medium" variant="text" href="/login">
            Log in
          </Button>
        </StackDiv>
      </Box>
    </Stack>
  );
};
