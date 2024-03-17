import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyType, companySchema } from "../schema";
import { registerCompany } from "../../../api/company";
import { breakTheme } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { InfoForm } from "../Form/InfoForm";
import { LocalizationForm } from "../Form/LocalizationForm";
import { DescriptionForm } from "../Form/DescriptionForm";
import { AuthToken } from "~/hooks";

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
  const form = useForm<CompanyType>({
    resolver: zodResolver(companySchema),
  });

  const { handleSubmit } = form;
  const onSubmit = async (data: CompanyType) => {
    await registerCompany(data);
    setTimeout(() => {
      navigate("/");
      AuthToken();
      navigate(0);
    }, 2000);
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
          <InfoForm formContext={form} register={true} />

          <Typography variant="h6">Localization</Typography>
          <LocalizationForm formContext={form} />

          <Typography variant="h6">About your company</Typography>
          <DescriptionForm formContext={form} />
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
