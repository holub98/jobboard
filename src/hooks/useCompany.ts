import { useEffect, useMemo, useState } from "react";
import { getAllCompanies, getMyCompany, getSingleCompany } from "~/api";

type Localization = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

type Company = {
  _id: string;
  name: string;
  localization: Localization;
  description?: string;
};
type Earnings = {
  from: string;
  to: string;
};
type Offer = {
  _id: string;
  name: string;
  earnings: Earnings;
  workDirection: "Remote" | "PartlyRemote" | "Office";
  requirements: string[];
  description: string;
};

export type SingleCompanyInfo = {
  company: {
    _id: string;
    email: string;
    name: string;
    localization: Localization;
    description?: string;
  };
  offers: Offer[];
  actualOffers: number;
};

export type AllCompanyInfo = {
  company: Company;
  actualOffers: number;
};

export type MyCompany = {
  company: {
    _id: string;
    email: string;
    password: string;
    name: string;
    localization: Localization;
    description: string;
  };
  myOffersCount: number;
};

export const useCompanies = () => {
  const allCompanies = () => {
    const [data, setData] = useState<AllCompanyInfo[]>();
    const fetchCompanies = useMemo(
      () => async () => {
        try {
          const response = await getAllCompanies();
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      []
    );
    useEffect(() => {
      fetchCompanies();
    }, [fetchCompanies]);

    return data;
  };

  const singleCompany = (companyId: string) => {
    const [data, setData] = useState<SingleCompanyInfo>();
    const fetchCompany = useMemo(
      () => async () => {
        try {
          const response = await getSingleCompany(companyId);
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      []
    );
    useEffect(() => {
      fetchCompany();
    }, [fetchCompany]);
    return data;
  };

  const myCompany = () => {
    const [data, setData] = useState<MyCompany>();
    const fetchMyCompany = useMemo(
      () => async () => {
        try {
          const response = await getMyCompany();
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      []
    );
    useEffect(() => {
      fetchMyCompany();
    }, [fetchMyCompany]);

    return data;
  };

  return { allCompanies, singleCompany, myCompany };
};
