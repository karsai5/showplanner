import { useSession } from "next-auth/react";

export const useLoggedInUser = () => {
  const { data, status } = useSession();
  console.log(data);
  console.log(status);
  if (status !== "authenticated") {
    return null;
  }
  return {
    jwt: data?.jwt,
    permissions: data?.permissions,
    person: {
      id: data?.person?.id,
      email: data?.person?.attributes?.email,
      avatar: data?.person?.attributes?.avatar,
      firstname: data?.person?.attributes?.firstname,
      lastname: data?.person?.attributes?.lastname,
    },
  };
};
