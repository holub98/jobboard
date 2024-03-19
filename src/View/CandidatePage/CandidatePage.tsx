import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useCandidate } from "~/hooks";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CandidateResumePdf } from "./GeneratePDF";

export const CandidatePage = () => {
  const { offerId, candidateId } = useParams();
  const navigate = useNavigate();
  const { singleCandidate } = useCandidate();

  if (offerId === undefined || candidateId === undefined) {
    return null;
  }

  const data = singleCandidate(offerId, candidateId);

  if (data === undefined) {
    return null;
  }
  return (
    <Stack height="100%">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" gap={1} alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackOutlined />
          </IconButton>
          <Typography variant="h6" fontSize="bold">
            Candidate
          </Typography>
        </Stack>

        <PDFDownloadLink
          document={<CandidateResumePdf data={data} />}
          fileName={`${data.candidate.firstName}-${data.candidate.lastName}-${data.offer.name}.pdf`}
        >
          <Button>Generate PDF</Button>
        </PDFDownloadLink>
      </Stack>
      <Stack gap={1} height="100%">
        <Paper
          elevation={3}
          sx={{
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Typography variant="h6">Personal info</Typography>
          <Stack
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                flexDirection: "row",
                justifyContent: "space-between",
              },
              flexDirection: "column",
            })}
          >
            <Stack direction="row" gap={1}>
              <Typography fontWeight="bold">Full name: </Typography>
              <Typography>
                {data.candidate.firstName} {data.candidate.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography fontWeight="bold">Email:</Typography>
              <Typography>{data.candidate.email}</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography fontWeight="bold">Phone:</Typography>
              <Typography>{data.candidate.phone}</Typography>
            </Stack>
          </Stack>
        </Paper>
        <Stack
          gap="16px"
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              flexDirection: "row",
            },
            flexDirection: "column",
          })}
        >
          <Paper
            elevation={3}
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                width: "100%",
              },
              flexDirection: "column",
              padding: "8px 16px",
              display: "flex",
              gap: "4px",
            })}
          >
            <Typography variant="h6">Stack:</Typography>
            <Stack direction="row" gap="16px" flexWrap="wrap">
              {data.candidate.stack.map((it) => {
                return (
                  <Typography key={it} variant="body1">
                    {it}
                  </Typography>
                );
              })}
            </Stack>
          </Paper>
          <Paper
            elevation={3}
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                width: "100%",
              },
              flexDirection: "column",
              padding: "8px 16px",
              display: "flex",
              gap: "4px",
            })}
          >
            <Typography variant="h6">Languages:</Typography>
            <Stack direction="column" gap="8px" flexWrap="wrap">
              {data.candidate.languages.map((it) => {
                return (
                  <Stack direction="row" gap={1}>
                    <Typography fontWeight="bold">{it.name} -</Typography>
                    <Typography>{it.level}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Paper>
        </Stack>

        <Typography variant="h6">Experience:</Typography>
        <Stack direction="row" gap="16px" flexWrap="wrap">
          {data.candidate.experience?.map((it) => {
            return (
              <Paper
                elevation={3}
                sx={{
                  padding: "8px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  width: "100%",
                }}
              >
                <Stack
                  sx={(theme) => ({
                    [theme.breakpoints.up("sm")]: {
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                    flexDirection: "column",
                  })}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {it.companyName}
                  </Typography>
                  <Typography variant="body1">
                    {it.dateFrom} - {it.dateTo ? it.dateTo : "Present"}
                  </Typography>
                </Stack>

                <Typography variant="body1">{it.job}</Typography>
              </Paper>
            );
          })}
        </Stack>

        <Typography variant="h6">Education:</Typography>
        <Stack direction="row" gap="16px" flexWrap="wrap">
          {data.candidate.education.map((it) => {
            return (
              <Paper
                elevation={3}
                sx={{
                  padding: "8px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  width: "100%",
                }}
              >
                <Stack
                  sx={(theme) => ({
                    [theme.breakpoints.up("sm")]: {
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                    flexDirection: "column",
                  })}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {it.schoolName}
                  </Typography>
                  <Typography variant="body1">
                    {it.dateFrom} - {it.dateTo ? it.dateTo : "Present"}
                  </Typography>
                </Stack>
                <Typography variant="body1">{it.faculty}</Typography>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
