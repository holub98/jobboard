import { Chip, Paper, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useCompanies } from "~/hooks";

export const CompanySinglePage = () => {
  const { companyId } = useParams();
  if (companyId === undefined) {
    return null;
  }
  const { singleCompany } = useCompanies();
  if (singleCompany === undefined) {
    return null;
  }
  const data = singleCompany(companyId);
  if (data === undefined) {
    return null;
  }
  return (
    <Stack gap="16px">
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
          })}
        >
          <Stack>
            <Typography>{data.company.name}</Typography>
            <Typography>Contact: {data.company.email}</Typography>
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
          <Stack>
            <Typography>Address:</Typography>
            <Typography>
              {data.company.localization.street}{" "}
              {data.company.localization.number}
            </Typography>
            <Typography>
              {data.company.localization.zipCode}{" "}
              {data.company.localization.city}
            </Typography>
            <Typography>{data.company.localization.country}</Typography>
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
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: data.company.description }} />
      </Paper>
      <Stack gap="8px" marginTop="8px">
        <Typography>Actual offers: {data.actualOffers}</Typography>
        {data.offers.map((it, index) => {
          return (
            <Paper
              elevation={3}
              key={index}
              sx={{
                padding: "8px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Stack
                sx={(theme) => ({
                  [theme.breakpoints.up("sm")]: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                  flexDirection: "column",
                })}
              >
                <Typography variant="h6">
                  <Link
                    to={`/offer/${it._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {it.name}
                  </Link>
                </Typography>
                <Typography variant="body1">
                  {it.earnings.from} - {it.earnings.to} PLN
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Stack gap="4px" flexWrap={"wrap"} direction={"row"}>
                  {it.requirements.slice(0, 3).map((it) => {
                    return <Chip key={it} label={it} />;
                  })}
                </Stack>
                <Typography variant="body2">{it.workDirection}</Typography>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
};
