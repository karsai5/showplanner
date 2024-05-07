import { FC, ReactNode } from "react";

const TOGGLES = {
  availabilities_menu: false,
  availabilities_shadow_menu: true,
  role_dropdown: true,
};

export const isToggledOn = (key: keyof typeof TOGGLES): boolean => {
  return TOGGLES[key];
};

export const Toggle: FC<{
  toggle: keyof typeof TOGGLES;
  children: ReactNode;
}> = ({ toggle, children }) => {
  if (isToggledOn(toggle)) {
    return <>{children}</>;
  }
  return null;
};
