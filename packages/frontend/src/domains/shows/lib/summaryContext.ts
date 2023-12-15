import { Show } from "core/api/generated";
import { createContext, useContext } from "react";

export const ShowSummaryContext = createContext<Show | undefined>(
  undefined
);

export const useShowSummary = () => {
  const show = useContext(ShowSummaryContext);
  if (!show) {
    throw new Error("Show context missing");
  }
  return show;
};
