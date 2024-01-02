import { Show, ShowDTO } from "core/api/generated";
import { createContext, useContext } from "react";

export const ShowSummaryContext = createContext<Show | undefined>(
  undefined
);

export const useShowSummary = (): ShowDTO => {
  const show = useContext<ShowDTO>(ShowSummaryContext);
  if (!show) {
    throw new Error("Show context missing");
  }
  return show;
};
