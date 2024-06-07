import Image from "next/image";
import { ReactNode } from "react";

import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import imageOne from "./images/1.jpg";
import imageTwo from "./images/2.jpg";
import imageThree from "./images/3.jpg";
import imageFour from "./images/4.jpg";
import imageFive from "./images/5.jpg";

const images = [imageOne, imageTwo, imageThree, imageFour, imageFive];
const randomImage = images[Math.floor(Math.random() * images.length)];

export const LayoutWithBackgroundImage: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="relative flex-grow">
        <Image
          src={randomImage}
          layout="fill"
          objectFit="cover"
          alt=""
          placeholder="blur"
          className="-z-20"
        />
        <div className="p-6">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
