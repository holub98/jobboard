import { useAtomValue } from "jotai";
import { SearchBar } from "~/components";
import { useOffers } from "~/hooks/useOffers";
import { filterAtom } from "~/state/filterSearch";

export const OffersView = () => {
  const { allOffers } = useOffers();
  if (allOffers === undefined) {
    return null;
  }
  const filter = useAtomValue(filterAtom);
  const offers = allOffers();
  console.log(offers, filter);
  return <SearchBar direction="row" toClear={true} />;
};
