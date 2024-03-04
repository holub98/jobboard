import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType, loginSchema } from "./schema";
import { useNavigate } from "react-router-dom";
import { login } from "~/api";
import { useSetAtom } from "jotai";
import { isLoginAuth } from "~/hooks";

export const LoginView = () => {
  const navigate = useNavigate();
  const setLogin = useSetAtom(isLoginAuth);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    login(data);

    setLogin({ ...data });

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
          width: 300,
          height: 400,
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" fontWeight="bold" color="text.secondary">
          Login
        </Typography>
        <Stack gap={2} width="100%">
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
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
          <Button
            size="large"
            variant="contained"
            color="success"
            type="submit"
          >
            Login
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography>Do not have an account?</Typography>
          <Button size="medium" variant="text" href="/signup">
            Sign up
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
