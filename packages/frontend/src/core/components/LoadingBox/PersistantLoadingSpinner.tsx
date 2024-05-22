import { useIsVisable } from "core/utils/useIsVisable";
import { useRef } from "react";

export const PersistantLoadingSpinner = () => {
  const ref = useRef(null);
  const isVisable = useIsVisable(ref);
  return (
    <>
      {!isVisable && (
        <span className="loading loading-spinner fixed bottom-4 z-50 opacity-30 text-black"></span>
      )}
      <span ref={ref} className="loading loading-spinner"></span>
    </>
  );
};
