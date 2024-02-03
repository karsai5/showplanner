import { useQuery } from "@tanstack/react-query";
import { getApi } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { H2 } from "core/components/Typography";
import { EventTable } from "domains/events/EventTable";
import Head from "next/head";
import { useRouter } from "next/router";

const ShowPage = () => {
  const api = getApi();
  const {
    query: { slug },
  } = useRouter();
  const { data, isLoading, isError } = useQuery(
    ["EventsListPublic", slug],
    async () => {
      if (!slug) {
        return null;
      }
      const { showName, events } = await api.publicScheduleGet({
        showSlug: slug as string,
      });
      return { showName, events };
    }
  );

  if (isLoading || isError || !data) {
    return (
      <>
        <Head>
          <title>Schedule - ShowPlanner</title>
        </Head>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div>
            <div className="flex justify-between items-center">
              <H2> Schedule </H2>
            </div>
            {isError && <ErrorBox>Could not get shows</ErrorBox>}
            {isLoading && <progress className="progress w-56"></progress>}
          </div>
        </div>
      </>
    );
  }

  const { showName, events } = data;

  return (
    <>
      <Head>
        <title>Schedule - {showName} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <div className="flex justify-between items-center">
            <H2>{showName} - Schedule </H2>
          </div>
          {events && <EventTable events={events} hideNote hideLocation />}
        </div>
      </div>
    </>
  );
};

export default ShowPage;
