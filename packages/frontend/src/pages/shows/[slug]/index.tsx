import { H2 } from "core/components/Typography";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { useShowSummary } from "domains/shows/lib/summaryContext";
import Head from "next/head";

const ShareEventButton: React.FC<{ showSlug: string }> = ({ showSlug }) => {
  return (
    <a
      className="btn mb-2"
      href={`/schedule/${showSlug}`}
      target="_blank"
      rel="noreferrer"
    >
      Open public link
    </a>
  );
};

const ShowPage = () => {
  const show = useShowSummary();
  return (
    <>
      <Head>
        <title>Schedule - {show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <H2>{show.name} - Schedule </H2>
        </div>
      </div>
    </>
  );
};

ShowPage.getLayout = (page: any) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

export default ShowPage;
