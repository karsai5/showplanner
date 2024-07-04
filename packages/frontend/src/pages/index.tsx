import HomeHero from "core/components/HomeHero/HomeHero";
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
  const accessToken = context.req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("sAccessToken"));
  if (accessToken) {
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
