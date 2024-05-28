import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, serverSideApi } from "core/api";
import { ShowReportDTO, ShowTimerDTO } from "core/api/generated";
import { ClockIcon } from "core/components/Icons";
import { StickyLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";
import { H2 } from "core/components/Typography";
import { showToastError } from "core/utils/errors";
import { ShowTimer } from "domains/showtimer/ShowTimer";
import { Timers } from "domains/showtimer/ShowTimer/types";
import { pickBy } from "lodash";
import moment from "moment";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

type SSRTimers = Partial<Record<keyof Timers, string>>;

export default function ShowTimerPage({
  id,
  initialTimers: ssrTimers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryClient = useQueryClient();

  const initialTimers = getTimersFromSSR(ssrTimers);
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
    props: { id: id, initialTimers: getSSRTimersFromDTO(showTimer || {}) },
  };
}) satisfies GetServerSideProps<{ id: string; initialTimers: SSRTimers }>;

const getSSRTimersFromDTO = (dto: ShowTimerDTO): SSRTimers => {
  const ssrTimers = {
    expectedCurtainsUp: dto.expectedCurtainsUp?.toISOString(),
    actOneStart: dto.showStart?.toISOString(),
    intervalStart: dto.intervalStart?.toISOString(),
    intervalEnd: dto.intervalEnd?.toISOString(),
    actTwoEnd: dto.showEnd?.toISOString(),
    houseOpen: dto.houseOpen?.toISOString(),
    fohClearance: dto.actOneFOHClearance?.toISOString(),
    intervalFohClearance: dto.actTwoFOHClearance?.toISOString(),
  };
  return pickBy(ssrTimers, (x) => x);
};

const getTimersFromSSR = (timers: SSRTimers): Partial<Timers> => ({
  expectedCurtainsUp: timers.expectedCurtainsUp
    ? moment(timers.expectedCurtainsUp)
    : null,
  actOneStart: timers.actOneStart ? moment(timers.actOneStart) : null,
  intervalStart: timers.intervalStart ? moment(timers.intervalStart) : null,
  intervalEnd: timers.intervalEnd ? moment(timers.intervalEnd) : null,
  actTwoEnd: timers.actTwoEnd ? moment(timers.actTwoEnd) : null,
  houseOpen: timers.houseOpen ? moment(timers.houseOpen) : null,
  fohClearance: timers.fohClearance ? moment(timers.fohClearance) : null,
  intervalFohClearance: timers.intervalFohClearance
    ? moment(timers.intervalFohClearance)
    : null,
});
