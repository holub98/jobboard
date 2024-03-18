import { SearchBar } from "~/components";
import { useOffers } from "~/hooks/useOffers";
import { OffersSection } from "./OffersSection";

export const OffersView = () => {
  const { allOffers } = useOffers();
  if (allOffers === undefined) {
    return null;
  }

  const offers = allOffers();
  if (offers === undefined) {
    return [];
  }
  return (
    <>
      <SearchBar direction="row" />
      <OffersSection />
    </>
  );
};
