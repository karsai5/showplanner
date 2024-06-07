import { createContext } from "react";

export const ConfettiContext = createContext<
  (options: confetti.Options) => void
>(() => {});
