import { Place } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useOffers } from "~/hooks";

export const OffersSection = () => {
  const { allOffers } = useOffers();
  if (allOffers === undefined) {
    return null;
  }

  const offers = allOffers();
  if (offers === undefined) {
    return null;
  }
  return (
    <Stack gap="8px" marginTop="24px">
      {offers.map((it, index) => {
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
                  to={`/offer/${it.offer._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {it.offer.name}
                </Link>
              </Typography>
              <Typography variant="body1">
                {it.offer.earnings.from} - {it.offer.earnings.to} PLN
              </Typography>
            </Stack>
            <Typography variant="subtitle2">{it.company.name}</Typography>
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Stack gap="4px" flexWrap={"wrap"} direction={"row"}>
                {it.offer.requirements.slice(0, 3).map((it) => {
                  return <Chip key={it} label={it} />;
                })}
              </Stack>
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
                  {it.company.localization.country}, {it.offer.workDirection}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
