import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import { ShowTimerDTO } from "core/api/generated";
import { ClockIcon } from "core/components/Icons";
import { StickyLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";
import { H2 } from "core/components/Typography";
import { ifResponseErrorCode, ssrWrapper } from "core/permissions/ssr";
import { showToastError } from "core/utils/errors";
import { mapShowTimerDTOtoTimers } from "domains/showtimer/mappers";
import { ShowTimer } from "domains/showtimer/ShowTimer";
import { TimersOnChange } from "domains/showtimer/ShowTimer/types";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const id = context.query.id;
  if (typeof id !== "string") {
    throw new Error("Incorrect ID format");
  }
  try {
    const showTimer = await api.showdocs.showdocTimersIdGet({ id });
    return { props: { id, showTimerJSON: superjson.stringify(showTimer) } };
  } catch (err) {
    if (ifResponseErrorCode(err, 404)) {
      return { props: { id, showTimerJSON: superjson.stringify({}) } };
    }
    throw err;
  }
});

export default function ShowTimerPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const queryClient = useQueryClient();

  const initialTimers = superjson.parse<ShowTimerDTO>(props.showTimerJSON);
  const mutation = useMutation<unknown, Error, TimersOnChange | undefined>({
    mutationFn: (timers) => {
      if (!timers) {
        throw new Error("Missing timers");
      }
      return api.showdocs.showdocTimersIdPost({
        id: props.id,
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
        initialTimers={mapShowTimerDTOtoTimers(initialTimers)}
      />
    </>
  );
}
