import { IconButton, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyOffers } from "~/hooks/useCompanyOfferts";
import { OfferUpdateModal } from "../OfferUpdateModal";
import { OfferDeleteModal } from "../OfferDeleteModal";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useCandidate } from "~/hooks/useCandidate";
import { OfferSection } from "./OfferSection";
import { CandiateSection } from "./CandiateSection";

export const SingleOfferPage = () => {
  const { offerId } = useParams();
  const { mySingleOffer } = useCompanyOffers();
  const navigate = useNavigate();
  const { myCandidates } = useCandidate();

  if (offerId === undefined) {
    return null;
  }
  const offer = mySingleOffer(offerId);
  const candidates = myCandidates(offerId);

  if (offer === undefined || candidates === undefined) {
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
            {offer.name}
          </Typography>
        </Stack>
        <Stack direction="row">
          <OfferUpdateModal initialData={offer} offerId={offerId} />
          <OfferDeleteModal initialData={offer} offerId={offerId} />
        </Stack>
      </Stack>
      <Stack direction="row" gap={2} height="100%">
        <OfferSection offer={offer} />
        <CandiateSection candidates={candidates} />
      </Stack>
    </Stack>
  );
};
