import HomeHero from "core/components/HomeHero/HomeHero";
import { LayoutWithBackgroundImage } from "domains/layout/LayoutWithBackgroundImage";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

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
Home.getLayout = (page: any) => (
  <LayoutWithBackgroundImage>{page}</LayoutWithBackgroundImage>
);

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  return {props: {}};
}

export default Home;
