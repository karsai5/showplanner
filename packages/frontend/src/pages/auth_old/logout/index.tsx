import { LogoutBox } from "domains/authentication/LogoutBox/LogoutBox";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      signOut({ redirect: false });
    } else {
      router.push("/");
    }
  }, [session, router]);
  return (
    <div className="z-10">
      <LogoutBox />
    </div>
  );
};
Logout.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);
export default Logout;
