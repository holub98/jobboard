import { useEffect, useState } from "react";
import { getOfferCadidates, getSingleCandidate } from "~/api";

export type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: string;
  dateTo?: string;
  description: string;
};

export type EducationType = {
  schoolName: string;
  dateFrom: string;
  dateTo?: string;
  faculty: string;
};
export type LanguagesType = {
  name: string;
  level: string;
};

export type CandidateType = {
  _id: string;
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience?: ExperienceType[];
  education: EducationType[];
  languages: LanguagesType[];
  stack: string[];
  another: string;
};

export const useCandidate = () => {
  const myCandidates = (offerId: string) => {
    const [data, setData] = useState<CandidateType[]>();
    useEffect(() => {
      getOfferCadidates(offerId).then((res) => setData(res.data));
    }, []);
    return data;
  };
  const singleCandidate = (offerId: string, candidateId: string) => {
    const [data, setData] = useState<CandidateType>();
    useEffect(() => {
      getSingleCandidate(offerId, candidateId).then((res) => setData(res.data));
    }, []);
    return data;
  };
  return { myCandidates, singleCandidate };
};
