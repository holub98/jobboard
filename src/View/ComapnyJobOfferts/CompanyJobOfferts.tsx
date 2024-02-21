import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { useCompanyOffers } from "~/hooks/useCompanyOfferts";
import { ZeroCountOffer } from "./ZeroCountOffer";
import { OfferCreateModal } from "./OfferCreateModal";
import {
  AssignmentOutlined,
  Business,
  Home,
  HomeWork,
} from "@mui/icons-material";
import { OfferUpdateModal } from "./OfferUpdateModal";
import { OfferDeleteModal } from "./OfferDeleteModal";

export const CompanyJobOfferts = () => {
  const { companyOfferInfo, myOffers } = useCompanyOffers();

  const data = companyOfferInfo();
  const offers = myOffers();
  console.log(offers);
  return (
    <Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        marginBottom="32px"
      >
        <Stack direction="row" gap="16px">
          <Typography variant="h4" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            Actual offers: {data.count}
          </Typography>
        </Stack>
        <OfferCreateModal />
      </Stack>
      {data.count === 0 && <ZeroCountOffer />}
      {offers.map((it) => {
        return (
          <Stack
            sx={{
              padding: "16px",
              marginBottom: "32px",
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: "20px",
            }}
            key={it._id}
          >
            <Stack gap="8px">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">
                  {it.name}
                </Typography>
                <Typography variant="h6">
                  {it.earnings.from} - {it.earnings.to} PLN
                </Typography>
              </Stack>
              <Stack flexDirection="row" justifyContent="space-between">
                <Stack direction="row" gap="4px">
                  {it.requirements.slice(0, 3).map((req) => {
                    return <Chip label={req} />;
                  })}
                </Stack>
                {it.workDirection === "Office" && (
                  <Stack direction="row" alignItems="center" gap="2px">
                    <Business />
                    <Typography>Office</Typography>
                  </Stack>
                )}
                {it.workDirection === "PartlyRemote" && (
                  <Stack direction="row" alignItems="center" gap="2px">
                    <HomeWork />
                    <Typography>Hybrid</Typography>
                  </Stack>
                )}
                {it.workDirection === "Remote" && (
                  <Stack direction="row" alignItems="center" gap="2px">
                    <Home />
                    <Typography>Work</Typography>
                  </Stack>
                )}
                <Stack direction="row" gap="2px">
                  <IconButton href={`/my-offerts/${it._id}`}>
                    <AssignmentOutlined />
                  </IconButton>
                  <OfferUpdateModal initialData={it} />
                  <OfferDeleteModal initialData={it} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};
