import { useEffect, useState } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const getSize = (size: Size) => {
  switch (size) {
    case "sm":
      return 640;
    case "md":
      return 768;
    case "lg":
      return 1024;
    case "xl":
      return 1280;
    case "2xl":
      return 1536;
  }
};

export const useBreakpoint = (size: Size) => {
  const pixelSize = getSize(size);
  const [isSmaller, setIsSmaller] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      const currentWindow = getWindowSize();
      if (currentWindow.innerWidth < pixelSize) {
        setIsSmaller(true);
      } else {
        setIsSmaller(false);
      }
    }

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return isSmaller;
};

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
