import {
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { OfferUpdateModal } from "../OfferUpdateModal";
import { OfferDeleteModal } from "../OfferDeleteModal";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useCandidate, useCompanyOffers } from "~/hooks";
import { OfferSection } from "./OfferSection";
import { CandiateSection } from "./CandiateSection";
import {  useState } from "react";

export const SingleOfferPage = () => {
  const { offerId } = useParams();
  const { mySingleOffer } = useCompanyOffers();
  const navigate = useNavigate();
  const { myCandidates } = useCandidate();

  const [side, setSide] = useState<string>("offer");

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

      <Stack
        direction="row"
        gap={2}
        height="100%"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            display: "flex",
          },
          display: "none",
        })}
      >
        <OfferSection offer={offer} />
        <CandiateSection candidates={candidates} />
      </Stack>

      <Stack
        direction="column"
        height="100%"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
          display: "flex",
          alignItems: "center",
          gap: "16px",
        })}
      >
        <ToggleButtonGroup
          exclusive
          value={side}
          onChange={(_, newValue) => {
            if (newValue !== null) {
              setSide(newValue);
            }
          }}
        >
          <ToggleButton value="offer" sx={{ width: "100px" }}>
            Offer
          </ToggleButton>
          <ToggleButton value="candidate" sx={{ width: "100px" }}>
            Candidates
          </ToggleButton>
        </ToggleButtonGroup>
        {side === "offer" && <OfferSection offer={offer} />}
        {side === "candidate" && <CandiateSection candidates={candidates} />}
      </Stack>
    </Stack>
  );
};
