import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, serverSideApi } from "core/api";
import { ShowReportDTO, ShowTimerDTO } from "core/api/generated";
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

export default function ShowTimerPage({
  id,
  initialTimers: ssrTimers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryClient = useQueryClient();

  const initialTimers = getTimersFromSSR(ssrTimers);
  const mutation = useMutation<unknown, Error, TimersOnChange | undefined>({
    mutationFn: (timers) => {
      if (!timers) {
        throw new Error("Missing timers");
      }
      return api.showtimersIdPost({
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

  if (typeof id !== "string") {
    throw new Error("Incorrect ID format");
  }
  let showTimer: ShowReportDTO | null = null;
  try {
    showTimer = await ssrApi.showtimersIdGet({ id });
  } catch (err) {
    console.error(err);
    // If the show report doesn't exist, we'll just show the form with default values
    // TODO: Should throw error if error is not a 400
  }
  return {
    props: { id: id, initialTimers: getSerialisedDTO(showTimer || {}) },
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
