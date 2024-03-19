import { useAtomValue } from "jotai";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { getAllOffers, getRecomeneded, getSingleOffer } from "~/api";
import { filterAtom } from "~/utils/filterSearch";

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
    const fetchOffers = useMemo(
      () => async () => {
        try {
          const response = await getRecomeneded();
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      []
    );
    useEffect(() => {
      fetchOffers();
    }, [fetchOffers]);

    return data;
  };
  const allOffers = () => {
    const [data, setData] = useState<JobOffers[]>();
    const filter = useAtomValue(filterAtom);
    const fetchOffers = useMemo(
      () => async () => {
        try {
          const response = await getAllOffers(filter);
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [filter]
    );
    useEffect(() => {
      fetchOffers();
    }, [fetchOffers, filter]);

    return data;
  };
  const singleOffer = (id: string) => {
    const [data, setData] = useState<JobOffers>();

    const fetchOffer = useMemo(
      () => async () => {
        try {
          const response = await getSingleOffer(id);
          setData(response.data);
        } catch (error) {
          enqueueSnackbar({ variant: "error", message: `${error}` });
        }
      },
      [data]
    );
    useEffect(() => {
      fetchOffer();
    }, [fetchOffer]);

    return data;
  };

  return { singleOffer, recomendedOffers, allOffers };
};
