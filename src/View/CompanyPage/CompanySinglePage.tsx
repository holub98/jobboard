import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
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
    <Stack>
      <Stack direction="row" gap={3} width="100%">
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
          <Stack>
            <Typography>{data.company.name}</Typography>
            <Typography>Contact: {data.company.email}</Typography>
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
              direction="row"
              alignItems="center"
              justifyContent="space-between"
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
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">{it.workDirection}</Typography>
              <Box sx={{ display: "flex", gap: "4px" }}>
                {it.requirements.slice(0, 3).map((it) => {
                  return <Chip key={it} label={it} />;
                })}
              </Box>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
