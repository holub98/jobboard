import { Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCompanies } from "~/hooks";
import { InfoUpdateModal } from "./InfoUpdateModal";
import { LocalizationUpdateModal } from "./LocalizationUpdateModal";
import { DescriptionUpdateModal } from "./DescriptionUpdateModal";
import { CloseAccountModal } from "./CloseAccountModal";

export const MyCompany = () => {
  const authStorage = localStorage.getItem("auth");
  if (!authStorage) {
    return null;
  }

  const tokenParsed = JSON.parse(authStorage);
  const token = tokenParsed.token;

  const { myCompany } = useCompanies();
  if (myCompany === undefined) {
    return null;
  }
  const data = myCompany(token);
  if (data === undefined) {
    return null;
  }
  return (
    <Stack height="100%" gap="16px">
      <Paper
        elevation={3}
        sx={{
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography variant="h6">
              <Link
                to={"/my-offers"}
                style={{ textDecoration: "none", color: "black" }}
              >
                My offers: {data.myOffersCount}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row" gap="4px">
            <CloseAccountModal token={token} />
          </Stack>
        </Stack>
      </Paper>
      <Stack
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
          },
          gap: "16px",
          flexDirection: "column",
        })}
      >
        <Paper
          elevation={3}
          sx={(theme) => ({
            [theme.breakpoints.up("sm")]: {
              width: "100%",
            },
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",

            justifyContent: "space-between",
          })}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Company info:</Typography>
            <InfoUpdateModal initialData={data.company} token={token} />
          </Stack>
          <Stack>
            <Typography>Name: {data.company.name}</Typography>
            <Typography>Email: {data.company.email}</Typography>
          </Stack>
        </Paper>

        <Paper
          elevation={3}
          sx={(theme) => ({
            [theme.breakpoints.up("sm")]: {
              width: "100%",
            },
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          })}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Company address:</Typography>
            <LocalizationUpdateModal initialData={data.company} token={token} />
          </Stack>
          <Stack>
            <Typography>
              {data.company.localization.street}{" "}
              {data.company.localization.number}
            </Typography>
            <Typography>
              {data.company.localization.zipCode}{" "}
              {data.company.localization.city}
            </Typography>
            <Typography> {data.company.localization.country}</Typography>
          </Stack>
        </Paper>
      </Stack>
      <Paper
        elevation={3}
        sx={{
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flexGrow: 1,
          marginBottom: "8px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">About me:</Typography>

          <DescriptionUpdateModal initialData={data.company} token={token} />
        </Stack>
        <div dangerouslySetInnerHTML={{ __html: data.company.description }} />
      </Paper>
    </Stack>
  );
};
