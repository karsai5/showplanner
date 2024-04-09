import { ShowDTO } from "core/api/generated";
import { createContext, useContext } from "react";

export const ShowSummaryContext = createContext<ShowDTO | undefined>(undefined);

export const useShowSummary = (): ShowDTO => {
  const show = useContext(ShowSummaryContext);
  if (!show) {
    throw new Error("Show context missing");
  }
  return show;
};
