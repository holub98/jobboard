import { Call, MailOutline } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { CandidateType } from "~/hooks/useCandidate";

type Props = {
  candidates: CandidateType[];
};

export const CandiateSection = ({ candidates }: Props) => {
  return (
    <Stack
      sx={{
        padding: "16px",
        backgroundColor: "secondary.dark",
        border: "2px solid",
        borderRadius: "20px",
        color: "primary.contrastText",
      }}
      width="100%"
      overflow="auto"
    >
      <Typography variant="h6" fontWeight="bold">
        Actual applies: {candidates.length}
      </Typography>
      <Stack gap={2}>
        {candidates.map((it) => (
          <Stack
            gap={2}
            sx={{
              padding: "16px",
              backgroundColor: "secondary.light",
              border: "2px solid",
              borderRadius: "20px",
              color: "primary.contrastText",
            }}
            key={it._id}
          >
            <Typography variant="h6">
              {it.firstName} {it.lastName}
            </Typography>
            <Button variant="text" href={`/my-offerts/${it.offerId}/${it._id}`}>
              More details
            </Button>
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Call />
                <Typography>{it.phone}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <MailOutline />
                <Typography>{it.email}</Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
