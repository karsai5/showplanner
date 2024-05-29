import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, serverSideApi } from "core/api";
import { ShowTimerDTO } from "core/api/generated";
import { ClockIcon } from "core/components/Icons";
import { StickyLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";
import { H2 } from "core/components/Typography";
import { showToastError } from "core/utils/errors";
import { getSerialisedDTO, Serialised } from "core/utils/ssr";
import { LayoutWithShowSidebar } from "domains/shows/LayoutForShow";
import { ShowTimer } from "domains/showtimer/ShowTimer";
import { Timers } from "domains/showtimer/ShowTimer/types";
import moment from "moment";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ShowTimerPage({
  id,
  initialTimers: ssrTimers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error, Timers | undefined>({
    mutationFn: (timers) => {
      if (!timers) {
        throw new Error("Missing timers");
      }
      return api.showtimersIdPost({
        id,
        timer: {
          expectedCurtainsUp: timers.expectedCurtainsUp?.toDate(),
          showStart: timers.actOneStart?.toDate(),
          intervalStart: timers.intervalStart?.toDate(),
          intervalEnd: timers.intervalEnd?.toDate(),
          showEnd: timers.actTwoEnd?.toDate(),
          houseOpen: timers.houseOpen?.toDate(),
          actOneFOHClearance: timers.fohClearance?.toDate(),
          actTwoFOHClearance: timers.intervalFohClearance?.toDate(),
          eventId: Number(ssrTimers.eventId),
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong saving show timer.", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["showtimers"],
      });
    },
  });

  const handleOnChange = (timers: Timers): void => {
    mutation.mutate(timers);
  };

  const initialTimers = getTimersFromSSR(ssrTimers);

  return (
    <>
      <Head>
        <title>ShowTimer</title>
      </Head>
      <H2 className="mb-6 flex items-center gap-2">
        {mutation.isLoading ? <StickyLoadingSpinner /> : <ClockIcon />}
        ShowTimer
      </H2>
      <ShowTimer
        onChange={(timers) => handleOnChange(timers)}
        initialTimers={initialTimers}
      />
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const id = context.query.id;
  const ssrApi = serverSideApi(context);

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    throw new Error("Incorrect ID format");
  }

  const event = await ssrApi.eventsIdGet({
    id: Number(id),
  });

  if (event.showTimer) {
    const showTimer = await ssrApi.showtimersIdGet({
      id: event.showTimer,
    });
    return {
      props: {
        initialTimers: getSerialisedDTO(showTimer),
        id: showTimer.id as string,
      },
    };
  }

  const newShowtimer = await ssrApi.showtimersIdPost({
    id: uuidv4().toString(),
    timer: {
      eventId: Number(id),
    },
  });

  return {
    props: {
      initialTimers: getSerialisedDTO(newShowtimer),
      id: newShowtimer.id as string,
    },
  };
}) satisfies GetServerSideProps<{
  id: string;
  initialTimers: Serialised<ShowTimerDTO>;
}>;

ShowTimerPage.getLayout = (page: ReactElement) => (
  <LayoutWithShowSidebar>{page}</LayoutWithShowSidebar>
);

const getTimersFromSSR = (
  timers: Serialised<ShowTimerDTO>
): Partial<Timers> => ({
  expectedCurtainsUp: timers.expectedCurtainsUp
    ? moment(timers.expectedCurtainsUp)
    : null,
  actOneStart: timers.showStart ? moment(timers.showStart) : null,
  intervalStart: timers.intervalStart ? moment(timers.intervalStart) : null,
  intervalEnd: timers.intervalEnd ? moment(timers.intervalEnd) : null,
  actTwoEnd: timers.showEnd ? moment(timers.showEnd) : null,
  houseOpen: timers.houseOpen ? moment(timers.houseOpen) : null,
  fohClearance: timers.actOneFOHClearance
    ? moment(timers.actOneFOHClearance)
    : null,
  intervalFohClearance: timers.actTwoFOHClearance
    ? moment(timers.actTwoFOHClearance)
    : null,
});
