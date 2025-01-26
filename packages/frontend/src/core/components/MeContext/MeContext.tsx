import { useQuery } from "@tanstack/react-query";
import { api } from "core/api";
import { PersonDTO, ResponseError } from "core/api/generated";
import NewPersonForm from "domains/personnel/NewPersonForm/NewPersonForm";
import WelcomeModal from "domains/personnel/WelcomeModal/WelcomeModal";
import { createContext, useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";

export const MeContext = createContext<null | PersonDTO>(null);

export const MeContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = Session.useSessionContext();

  const { data, refetch, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.personnel.meDetailsGet(),
    staleTime: 1000 * 60 * 30,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (!session.loading && session.doesSessionExist) {
      refetch();
    }
  }, [session, refetch]);

  if ((error as ResponseError)?.response?.status == 404) {
    return (
      <>
        <WelcomeModal />
        <NewPersonForm onSuccess={() => refetch()} />
      </>
    );
  }

  if (data) {
    return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
  }
  return <>{children}</>;
};
