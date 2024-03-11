import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { getAllOffers, getRecomeneded, getSingleOffer } from "~/api";
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

type CompanyType = {
  _id: string;
  name: string;
  localization: LocalizationType;
};
type LocalizationType = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

type JobOffers = {
  offer: Offers;
  company: CompanyType;
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
    const [data, setData] = useState<JobOffers[]>();
    const filter = useAtomValue(filterAtom);

    useEffect(() => {
      getAllOffers(filter).then((res) => setData(res.data));
    }, []);
    console.log("effect", data, filter);
    return data;
  };
  const singleOffer = (id: string) => {
    const [data, setData] = useState<JobOffers>();
    useEffect(() => {
      getSingleOffer(id).then((res) => setData(res.data));
    }, []);
    return data;
  };

  return { singleOffer, recomendedOffers, allOffers };
};
