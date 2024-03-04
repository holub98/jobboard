import { useEffect, useState } from "react";
import { getMyOfferCount, getMyOffers, getSingleOffer } from "~/api";

type CompanyCount = {
  name: string;
  count: number;
};

type Earnings = {
  from: string;
  to: string;
};

type myOffers = {
  _id: string;
  name: string;
  earnings: Earnings;
  workDirection: "Remote" | "PartlyRemote" | "Office";
  requirements: string[];
  description: string;
};

export const useCompanyOffers = () => {
  const companyOfferInfo = () => {
    const [data, setData] = useState<CompanyCount>({ name: "", count: 0 });
    useEffect(() => {
      getMyOfferCount().then((res) => {
        setData(res.data);
      });
    }, []);
    return data;
  };

  const myOffers = () => {
    const [data, setData] = useState<myOffers[]>();
    useEffect(() => {
      getMyOffers().then((res) => setData(res.data));
    }, []);
    if (data === undefined) return [];

    return data;
  };

  const mySingleOffer = (singleId: string) => {
    const [data, setData] = useState<myOffers>();
    useEffect(() => {
      getSingleOffer(singleId).then((res) => setData(res.data));
    }, []);
    return data;
  };
  return { companyOfferInfo, myOffers, mySingleOffer };
};
