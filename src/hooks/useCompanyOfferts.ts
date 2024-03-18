import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { getMyOfferCount, getMyOffers, getMySingleOffer } from "~/api";

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

    const fetchMyOffers = useMemo(
      () => async () => {
        try {
          const response = await getMyOfferCount();
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [data]
    );
    useEffect(() => {
      fetchMyOffers();
    }, [fetchMyOffers]);

    return data;
  };

  const myOffers = () => {
    const [data, setData] = useState<myOffers[]>();
    const fetchMyOffers = useMemo(
      () => async () => {
        try {
          const response = await getMyOffers();
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [data]
    );
    useEffect(() => {
      fetchMyOffers();
    }, [fetchMyOffers]);

    if (data === undefined) return [];
    return data;
  };

  const mySingleOffer = (singleId: string) => {
    const [data, setData] = useState<myOffers>();

    const fetchMyOffers = useMemo(
      () => async () => {
        try {
          const response = await getMySingleOffer(singleId);
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [data]
    );
    useEffect(() => {
      fetchMyOffers();
    }, [fetchMyOffers]);

    return data;
  };
  return { companyOfferInfo, myOffers, mySingleOffer };
};
