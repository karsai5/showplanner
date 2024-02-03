import { ReactNode } from "react";

import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";

export const DefaultLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow m-6 relative">{children}</div>
      <Footer />
    </div>
  );
};
