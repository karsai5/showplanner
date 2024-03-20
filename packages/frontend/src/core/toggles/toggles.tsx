import { FC, ReactNode } from "react";

const TOGGLES = {
  availabilities_menu: false,
}

export const isToggledOn = (key: keyof typeof TOGGLES): boolean => {
  return TOGGLES[key];
}

export const Toggle: FC<{ key: keyof typeof TOGGLES, children: ReactNode }> = ({ key, children }) => {
  if (isToggledOn(key)) {
    return <>{children}</>
  }
  return null;
}
