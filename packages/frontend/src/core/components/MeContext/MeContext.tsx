import { useQuery } from "@tanstack/react-query"
import { getApi } from "core/api";
import { ResponseError } from "core/api/generated";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import NewPersonForm from "domains/personnel/NewPersonForm/NewPersonForm";
import WelcomeModal from "domains/personnel/WelcomeModal/WelcomeModal";
import { useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";

const api = getApi();

export const MeContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = Session.useSessionContext();

  const { refetch, error, fetchStatus } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.meGet(),
    staleTime: 1000 * 60 * 30,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (!session.loading && session.doesSessionExist) {
      refetch()
    }
  }, [session, refetch])

  if (fetchStatus === "fetching" || session.loading) {
    return <LoadingBox />
  }

  if ((error as ResponseError)?.response?.status == 404) {
    return <>
      <WelcomeModal />
      <NewPersonForm onSuccess={() => refetch()} />
    </>
  }

  return <>{children}</>
}
