import { Business, Home, HomeWork } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { OfferType } from "../schema";

type Props = {
  offer: OfferType;
};

export const OfferSection = ({ offer }: Props) => {
  return (
    <Stack height="100%">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          padding: "16px",
          marginBottom: "32px",
          backgroundColor: "primary.light",
          border: "2px solid",
          borderRadius: "20px",
          color: "primary.contrastText",
        }}
      >
        {offer.workDirection === "Office" && (
          <Stack direction="row" alignItems="center" gap="2px">
            <Business />
            <Typography variant="h6">Office</Typography>
          </Stack>
        )}
        {offer.workDirection === "PartlyRemote" && (
          <Stack direction="row" alignItems="center" gap="2px">
            <HomeWork />
            <Typography variant="h6"> Hybrid</Typography>
          </Stack>
        )}
        {offer.workDirection === "Remote" && (
          <Stack direction="row" alignItems="center" gap="2px">
            <Home />
            <Typography variant="h6">Work</Typography>
          </Stack>
        )}
        <Typography variant="h6">
          Earnings: {offer.earnings.from} - {offer.earnings.to} PLN
        </Typography>
      </Stack>
      <Stack
        direction="column"
        gap="16px"
        sx={{
          padding: "16px",
          marginBottom: "32px",
          backgroundColor: "primary.light",
          border: "2px solid",
          borderRadius: "20px",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6">Requirement stack:</Typography>
        <Stack
          direction="row"
          gap="16px"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {offer.requirements.map((it) => {
            return (
              <Typography key={it} variant="body1">
                {it}
              </Typography>
            );
          })}
        </Stack>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: offer.description }} />
    </Stack>
  );
};
