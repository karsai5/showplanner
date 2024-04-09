import HomeHero from "core/components/HomeHero/HomeHero";
import { getLoggedIn } from "core/permissions";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { ReactElement } from "react";

const Home = () => {
  return (
    <>
      <Head>
        <title>ShowPlanner</title>
      </Head>

      <HomeHero />
    </>
  );
};
Home.getLayout = (page: ReactElement) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isLoggedIn = await getLoggedIn(context);

  if (isLoggedIn) {
    return {
      redirect: {
        destination: "/shows",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default Home;
