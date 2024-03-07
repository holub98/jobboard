import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { getAllOffers, getRecomeneded } from "~/api";
import { filterAtom } from "~/state/filterSearch";

type Earnings = {
  from: string;
  to: string;
};

type Offers = {
  _id: string;
  name: string;
  earnings: Earnings;
  workDirection: "Remote" | "PartlyRemote" | "Office";
  requirements: string[];
  description: string;
};
export const useOffers = () => {
  const recomendedOffers = () => {
    const [data, setData] = useState<Offers[]>();
    useEffect(() => {
      getRecomeneded().then((res) => setData(res.data));
    }, []);

    return data;
  };
  const allOffers = () => {
    const [data, setData] = useState<Offers[]>();
    const filter = useAtomValue(filterAtom);

    useEffect(() => {
      getAllOffers(filter).then((res) => setData(res.data));
    }, []);
    return data;
  };

  return { recomendedOffers, allOffers };
};
