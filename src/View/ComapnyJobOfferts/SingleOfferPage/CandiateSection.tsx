import { Call, MailOutline } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { CandidateType } from "~/hooks";

type Props = {
  candidates: CandidateType[];
};

export const CandiateSection = ({ candidates }: Props) => {
  return (
    <Stack width="100%">
      <Typography variant="h6" fontWeight="bold">
        Actual applies: {candidates.length}
      </Typography>

      {candidates.map((it, index) => (
        <Paper
          elevation={3}
          sx={{
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
          key={index}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
              {it.firstName} {it.lastName}
            </Typography>
            <Button variant="text" href={`/my-offers/${it.offerId}/${it._id}`}>
              More details
            </Button>
          </Stack>
          <Stack gap={1} direction="row">
            <Stack direction="row" alignItems="center" gap={1}>
              <Call />
              <Typography>{it.phone}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <MailOutline />
              <Typography>{it.email}</Typography>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
