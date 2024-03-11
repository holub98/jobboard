import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useOffers } from "~/hooks/useOffers";

export const SingleOfferView = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { singleOffer } = useOffers();
  if (singleOffer === undefined || offerId === undefined) {
    return null;
  }
  const data = singleOffer(offerId);
  if (data === undefined) {
    return null;
  }

  return (
    <>
      <Stack justifyContent="space-between" direction="row">
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBack />
        </IconButton>
        <Button>Apply</Button>
      </Stack>
    </>
  );
};
