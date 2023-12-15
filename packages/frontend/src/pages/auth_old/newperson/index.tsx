import NewPersonForm from "domains/personnel/NewPersonForm/NewPersonForm";
import WelcomeModal from "domains/personnel/WelcomeModal/WelcomeModal";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const NewPerson = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.person) {
      router.push("/shows");
    }
  }, [session]);
  return (
    <>
      <WelcomeModal />
      <NewPersonForm />
    </>
  );
};
export default NewPerson;
