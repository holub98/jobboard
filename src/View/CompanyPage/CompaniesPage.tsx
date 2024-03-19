import { Place } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCompanies } from "~/hooks";

export const CompaniesPage = () => {
  const { allCompanies } = useCompanies();
  if (allCompanies === undefined) {
    return null;
  }
  const data = allCompanies();
  if (data === undefined) {
    return null;
  }
  return (
    <Stack>
      {data.map((it, index) => {
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
            <Stack direction="column" gap={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/company/${it.company._id}`}
                  >
                    {it.company.name}
                  </Link>
                </Typography>
                <Typography variant="h6">
                  Actual offers: {it.actualOffers}
                </Typography>
              </Stack>
              {/* <div dangerouslySetInnerHTML={{__html: it.company.description}}/> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Place sx={{ fontSize: "17px" }} />
                <Typography variant="body2">
                  {it.company.localization.city},{" "}
                  {it.company.localization.country}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
