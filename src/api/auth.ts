import { enqueueSnackbar } from "notistack";
import { api } from "./api";

type LoginType = {
  email: string;
  password: string;
};

export const login = async (data: LoginType) => {
  try {
    await api.post("/auth/login", data);
    enqueueSnackbar({ variant: "success", message: "Login success" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const logout = () => {
  try {
    api.post("/auth/logout");
    enqueueSnackbar({ variant: "success", message: "Logout success" });
  } catch (err) {
    enqueueSnackbar({ variant: "error", message: `${err}` });
  }
};

export const validate = () => {
  api.get("/auth/validate-token");
};
