import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "core/api";
import { ShowTimerDTO } from "core/api/generated";
import { ClockIcon } from "core/components/Icons";
import { StickyLoadingSpinner } from "core/components/LoadingBox/PersistantLoadingSpinner";
import { H2 } from "core/components/Typography";
import { ssrWrapper } from "core/permissions/ssr";
import { showToastError } from "core/utils/errors";
import { mapShowTimerDTOtoTimers } from "domains/showtimer/mappers";
import { ShowTimer } from "domains/showtimer/ShowTimer";
import { TimersOnChange } from "domains/showtimer/ShowTimer/types";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SuperJSON from "superjson";
import { v4 as uuidv4 } from "uuid";

export const getServerSideProps = ssrWrapper(async (context, api) => {
  const id = context.query.id;

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    throw new Error("Incorrect ID format");
  }

  const event = await api.default.eventsIdGet({
    id: Number(id),
  });

  let showTimer: ShowTimerDTO;
  if (event.showTimer) {
    showTimer = await api.showdocs.showdocTimersIdGet({
      id: event.showTimer,
    });
  } else {
    showTimer = await api.showdocs.showdocTimersIdPost({
      id: uuidv4().toString(),
      timer: {
        eventId: Number(id),
      },
    });
  }

  return {
    props: {
      showTimerJSON: SuperJSON.stringify(showTimer),
      id: showTimer.id as string,
    },
  };
});

export default function ShowTimerPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const queryClient = useQueryClient();
  const path = usePathname();
  const showReportUrl = path.replace(/\/[^/]*$/, "/showreport");
  const showTimer = SuperJSON.parse<ShowTimerDTO>(props.showTimerJSON);

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
          eventId: showTimer.eventId,
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
        initialTimers={mapShowTimerDTOtoTimers(showTimer)}
      />
    </>
  );
}
