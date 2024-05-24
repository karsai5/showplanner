import { RefObject, useEffect, useMemo, useState } from "react";

export const useIsSticky = (ref: RefObject<HTMLElement>) => {
  const [isSticky, setIsSticky] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => setIsSticky(entry.isIntersecting), {
        rootMargin: "0px 0px 0px -1px",
        threshold: [1],
      }),
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref, observer]);

  return !isSticky;
};
