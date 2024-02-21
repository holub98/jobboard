import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useCandidate } from "~/hooks/useCandidate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GeneratePdf } from "./GeneratePdf";

export const CandidatePage = () => {
  const { offerId, candidateId } = useParams();
  const navigate = useNavigate();
  const { singleCandidate } = useCandidate();

  if (offerId === undefined || candidateId === undefined) {
    return null;
  }

  const candidate = singleCandidate(offerId, candidateId);

  if (candidate === undefined) {
    return null;
  }

  return (
    <Stack height="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" gap={1} alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackOutlined />
          </IconButton>
          <Typography variant="h5" fontSize="bold">
            Candidate info
          </Typography>
        </Stack>

        <PDFDownloadLink
          document={<GeneratePdf initialData={candidate} />}
          fileName={`${candidate.firstName}-${candidate.lastName}.pdf`}
        >
          {({ loading }) =>
            loading ? "Loading document..." : <Button>Generate PDF</Button>
          }
        </PDFDownloadLink>
      </Stack>
      <Stack gap={1} height="100%">
        <Stack
          direction="column"
          sx={{
            padding: "16px",
            backgroundColor: "primary.light",
            border: "2px solid",
            borderRadius: "20px",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6">Personal info</Typography>
          <Divider />
          <Stack direction="row" justifyContent="space-between" marginTop="4px">
            <Stack direction="row" gap={1}>
              <Typography>Full name: </Typography>
              <Typography>
                {candidate.firstName} {candidate.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography>Email:</Typography>
              <Typography>{candidate.email}</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography>Phone:</Typography>
              <Typography>{candidate.phone}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" width="100%">
          <Stack
            direction="column"
            gap="16px"
            sx={{
              padding: "16px",
              backgroundColor: "primary.light",
              border: "2px solid",
              borderRadius: "20px",
              color: "primary.contrastText",
            }}
            width="100%"
          >
            <Typography variant="h6">Stack:</Typography>
            <Stack direction="row" gap="16px" flexWrap="wrap">
              {candidate.stack.map((it) => {
                return (
                  <Typography key={it} variant="body1">
                    {it}
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            direction="column"
            gap="16px"
            sx={{
              padding: "16px",
              backgroundColor: "primary.light",
              border: "2px solid",
              borderRadius: "20px",
              color: "primary.contrastText",
            }}
            width="100%"
          >
            <Typography variant="h6">Languages:</Typography>
            <Stack direction="row" gap="16px" flexWrap="wrap">
              {candidate.languages.map((it) => {
                return (
                  <Stack direction="row" gap={1}>
                    <Typography fontWeight="bold">{it.name} -</Typography>
                    <Typography>{it.level}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          gap="16px"
          sx={{
            padding: "16px",
            backgroundColor: "primary.light",
            border: "2px solid",
            borderRadius: "20px",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6">Experience:</Typography>
          <Stack direction="row" gap="16px" flexWrap="wrap">
            {candidate.experience?.map((it) => {
              return (
                <Box key={it.companyName}>
                  <Typography variant="body1" fontWeight="bold">
                    {it.companyName}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {it.job}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {it.dateFrom}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {it.dateTo === undefined ? "present" : it.dateTo}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          direction="column"
          gap="16px"
          sx={{
            padding: "16px",
            backgroundColor: "primary.light",
            border: "2px solid",
            borderRadius: "20px",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6">Education:</Typography>
          <Stack direction="row" gap="16px" flexWrap="wrap">
            {candidate.education.map((it) => {
              return (
                <Box key={it.schoolName}>
                  <Typography variant="body1" fontWeight="bold">
                    {it.schoolName}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {it.faculty}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {it.dateFrom}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {it.dateTo}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
