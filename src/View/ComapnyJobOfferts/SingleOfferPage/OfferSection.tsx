import { Paper, Stack, Typography } from "@mui/material";
import { OfferType } from "../schema";

type Props = {
  offer: OfferType;
};

export const OfferSection = ({ offer }: Props) => {
  return (
    <Stack height="100%" width="100%" gap="16px">
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
          <Typography variant="h6">{offer.workDirection}</Typography>

          <Typography variant="h6">
            {offer.earnings.from} - {offer.earnings.to} PLN
          </Typography>
        </Stack>
      </Paper>
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
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography variant="h6">Requirement stack:</Typography>
          <Stack direction="row" gap="16px" flexWrap="wrap">
            {offer.requirements.map((it) => {
              return (
                <Typography key={it} variant="body1">
                  {it}
                </Typography>
              );
            })}
          </Stack>
        </Stack>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          padding: "8px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flexGrow: 1,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: offer.description }} />
      </Paper>
    </Stack>
  );
};
