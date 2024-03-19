import { Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useCompanyOffers } from "~/hooks";
import { ZeroCountOffer } from "../../components/ZeroCounts/ZeroCountOffer";
import { OfferCreateModal } from "./OfferCreateModal";
import { AssignmentOutlined } from "@mui/icons-material";
import { OfferUpdateModal } from "./OfferUpdateModal";
import { OfferDeleteModal } from "./OfferDeleteModal";

export const CompanyJobOfferts = () => {
  const { companyOfferInfo, myOffers } = useCompanyOffers();

  const data = companyOfferInfo();
  const offers = myOffers();

  if (offers === undefined) {
    return null;
  }
  return (
    <Stack gap="16px">
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <Stack
          gap="8px"
          sx={(theme) => ({
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
            flexDirection: "column",
          })}
        >
          <Typography variant="h5" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Actual offers: {data.count}
          </Typography>
        </Stack>
        <OfferCreateModal />
      </Stack>
      {data.count === 0 && <ZeroCountOffer my />}
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
            <Stack gap="8px">
              <Stack
                sx={(theme) => ({
                  [theme.breakpoints.up("sm")]: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                  flexDirection: "column",
                })}
              >
                <Typography variant="h5" fontWeight="bold">
                  {it.name}
                </Typography>
                <Typography variant="h6">
                  {it.earnings.from} - {it.earnings.to} PLN
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Stack gap="4px" flexWrap={"wrap"} direction={"row"}>
                  {it.requirements.slice(0, 3).map((req) => {
                    return <Chip label={req} />;
                  })}
                </Stack>
                <Typography>{it.workDirection}</Typography>
              </Stack>
              <Stack direction="row" gap="2px" justifyContent="flex-end">
                <IconButton href={`/my-offers/${it._id}`}>
                  <AssignmentOutlined />
                </IconButton>
                <OfferUpdateModal initialData={it} offerId={it._id} />
                <OfferDeleteModal initialData={it} offerId={it._id} />
              </Stack>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};
