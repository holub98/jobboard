import { Stack, Typography } from "@mui/material";
import noOffers from "/noOffers.jpg";

export const ZeroCountOffer = () => {
  return (
    <Stack alignItems="center" gap={4}>
      <img src={noOffers} width={500} height={500} />
      <Stack alignItems="center" gap={1}>
        <Typography variant="h5" fontWeight="bold">
          No added offers
        </Typography>
        <Typography variant="h6">Add your first offer!</Typography>
      </Stack>
    </Stack>
  );
};
