import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, serverSideApi } from "core/api";
import { ShowTimerDTO } from "core/api/generated";
import { ClockIcon } from "core/components/Icons";
import { StickyLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";
import { H2 } from "core/components/Typography";
import { showToastError } from "core/utils/errors";
import { getSerialisedDTO, Serialised } from "core/utils/ssr";
import { ShowTimer } from "domains/showtimer/ShowTimer";
import { Timers, TimersOnChange } from "domains/showtimer/ShowTimer/types";
import moment from "moment";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function ShowTimerPage({
  id,
  initialTimers: ssrTimers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryClient = useQueryClient();
  const path = usePathname();
  const showReportUrl = path.replace(/\/[^/]*$/, "/showreport");

  const mutation = useMutation<unknown, Error, TimersOnChange | undefined>({
    mutationFn: (timers) => {
      if (!timers) {
        throw new Error("Missing timers");
      }
      return api.showdocs.showdocTimersIdPost({
        id,
        timer: {
          expectedCurtainsUp: timers.expectedCurtainsUp,
          showStart: timers.actOneStart,
          intervalStart: timers.intervalStart,
          intervalEnd: timers.intervalEnd,
          showEnd: timers.actTwoEnd,
          houseOpen: timers.houseOpen,
          actOneFOHClearance: timers.fohClearance,
          actTwoFOHClearance: timers.intervalFohClearance,
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

  const handleOnChange = (timers: TimersOnChange): void => {
    mutation.mutate(timers);
  };

  const initialTimers = getTimersFromSSR(ssrTimers);

  return (
    <>
      <Head>
        <title>ShowTimer</title>
      </Head>
      <div className="flex gap-4 justify-between">
        <H2 className="mb-6 flex items-center gap-2">
          ShowTimer
          {mutation.isLoading ? <StickyLoadingSpinner /> : <ClockIcon />}
        </H2>
        <Link href={showReportUrl}>
          <button className="btn">Show Report</button>
        </Link>
      </div>
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

  const event = await ssrApi.default.eventsIdGet({
    id: Number(id),
  });

  if (event.showTimer) {
    const showTimer = await ssrApi.showdocs.showdocTimersIdGet({
      id: event.showTimer,
    });
    return {
      props: {
        initialTimers: getSerialisedDTO(showTimer),
        id: showTimer.id as string,
      },
    };
  }

  const newShowtimer = await ssrApi.showdocs.showdocTimersIdPost({
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
