import { useEffect, useState } from "react";
import { getRecomeneded } from "~/api";

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
    const [data, setData] = useState<Offers>();
    useEffect(() => {
      getRecomeneded().then((res) => setData(res.data));
    });

    return data;
  };

  return { recomendedOffers };
};
