import HomeHero from "core/components/HomeHero/HomeHero";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

const Home = () => {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/shows");
  }
  return (
    <>
      <Head>
        <title>ShowPlanner</title>
      </Head>

      <HomeHero />
    </>
  );
};
Home.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (session?.jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/shows",
      },
    };
  }
  return { props: { session } };
}

export default Home;
