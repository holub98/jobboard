import { Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCompanies } from "~/hooks/useCompany";
import { InfoUpdateModal } from "./InfoUpdateModal";
import { LocalizationUpdateModal } from "./LocalizationUpdateModal";
import { DescriptionUpdateModal } from "./DescriptionUpdateModal";
import { CloseAccountModal } from "./CloseAccountModal";

export const MyCompany = () => {
  const { myCompany } = useCompanies();
  if (myCompany === undefined) {
    return null;
  }
  const data = myCompany();
  if (data === undefined) {
    return null;
  }
  console.log(data);
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
            <Typography>My profile</Typography>
            <Typography>
              <Link
                to={"/my-offers"}
                style={{ textDecoration: "none", color: "black" }}
              >
                My offers offers: {data.myOffersCount}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row" gap="4px">
            <CloseAccountModal />
          </Stack>
        </Stack>
      </Paper>

      <Stack direction="row" justifyContent="space-between" gap="16px">
        <Paper
          elevation={3}
          sx={{
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography>Company info:</Typography>
            <InfoUpdateModal initialData={data.company} />
          </Stack>
          <Stack>
            <Typography>Name: {data.company.name}</Typography>
            <Typography>Email: {data.company.email}</Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography>Company info:</Typography>
            <LocalizationUpdateModal initialData={data.company} />
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
          <Typography>About me:</Typography>

          <DescriptionUpdateModal initialData={data.company} />
        </Stack>
        <div dangerouslySetInnerHTML={{ __html: data.company.description }} />
      </Paper>
    </Stack>
  );
};
