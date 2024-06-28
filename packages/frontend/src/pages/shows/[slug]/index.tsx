import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import {
  PersonSummaryDTO,
  ScheduleEventDTO,
  ScheduleEventDTOAllOfRoles,
  ScheduleEventDTOAllOfRolesTypeEnum,
} from "core/api/generated";
import Address from "core/components/Address/Address";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import { LoadingBox } from "core/components/LoadingBox/LoadingBox";
import { useModal } from "core/components/Modal/Modal";
import { Td } from "core/components/tables/tables";
import { TimeRangeWithCurtainsUpCell } from "core/components/tables/TimeRangeWithCurtainsUp";
import { H2 } from "core/components/Typography";
import {
  HasPermission,
  PERMISSION,
  showPermission,
  useHasPermission,
} from "core/permissions";
import { ssrWrapper } from "core/permissions/ssr";
import { showToastError } from "core/utils/errors";
import dayjs from "dayjs";
import { EventDividerForm } from "domains/events/EventDividerForm/EventDividerForm";
import { EventForm } from "domains/events/EventForm/EventForm";
import { AvailabilityDropdown } from "domains/events/EventTable/components/AvailabilityDropdown";
import {
  DividerRendererType,
  EventRendererType,
  EventTable,
} from "domains/events/EventTable/EventTable";
import { CloneEventModal } from "domains/events/EventTable/modals/CloneEventModal";
import { DeleteEventModal } from "domains/events/EventTable/modals/DeleteEventModal";
import { EditEventModal } from "domains/events/EventTable/modals/EditEventModal";
import { displayDate } from "domains/events/lib/displayDate";
import { PersonDisplayName } from "domains/personnel/PersonDisplayName";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import superjson from "superjson";

export const getServerSideProps = ssrWrapper(async (ctx, api) => {
  const slug = ctx.query.slug;
  if (typeof slug !== "string") {
    throw new Error("Incorrect slug format");
  }

  const show = await api.rostering.showsShowSlugSummaryGet({
    showSlug: slug,
  });
  const events = await api.default.scheduleGet({ showId: show.id });
  return {
    props: { show, eventsJSON: superjson.stringify(events) },
  };
});

export default function ShowPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { show } = props;
  const [showAllEvents, setShowAllEvents] = useState(false);
  const {
    data: events,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["EventsList", show.id],
    queryFn: () => api.default.scheduleGet({ showId: show.id }),
    initialData: superjson.parse<ScheduleEventDTO[]>(props.eventsJSON),
  });
  const startOfToday = dayjs().startOf("day");
  const allEvents = events || [];
  const futureEvents = allEvents.filter((e) =>
    dayjs(e.start).isAfter(startOfToday)
  );

  useEffect(() => {
    if (isSuccess && futureEvents.length === 0) {
      setShowAllEvents(true);
    }
  }, [futureEvents.length, isSuccess]);

  return (
    <>
      <Head>
        <title>{show.name} - ShowPlanner</title>
      </Head>
      <div className="flex flex-col justify-between sm:flex-row gap-4">
        <div className="mb-4">
          <H2 className="">{show.name}</H2>
          <Link
            href={`${show.slug}/public`}
            target="_blank"
            className="link text-sm"
          >
            View public schedule
          </Link>
        </div>
        <div className="flex gap-2 mb-4">
          <HasPermission showId={show.id} permission={PERMISSION.addEvents}>
            <AddEventButton showId={show.id} />
            <AddDividerButton showId={show.id} />
          </HasPermission>
          <button
            className="btn"
            onClick={() => setShowAllEvents(!showAllEvents)}
          >
            {showAllEvents ? "Hide" : "Show"} past events
          </button>
        </div>
      </div>
      {isError && <ErrorBox>Could not get shows</ErrorBox>}
      {isLoading && <LoadingBox />}
      {events && (
        <>
          {futureEvents.length === 0 && allEvents.length > 0 && (
            <ErrorBox info>Show is over. All events are in the past</ErrorBox>
          )}
          <EventTable
            headers={<Headers showId={show.id} />}
            eventRenderer={eventRenderer(show.id)}
            dividerRenderer={DividerRenderer}
            events={showAllEvents ? allEvents : futureEvents}
          />
        </>
      )}
    </>
  );
}

const Headers: React.FC<{ showId: number }> = ({ showId }) => {
  const canEditEvents = useHasPermission()(
    showPermission(showId, PERMISSION.addEvents)
  );
  return (
    <>
      <th>Date</th>
      <th>Event</th>
      <th>Availability/Attendance</th>
      <th>Role</th>
      <th>Location</th>
      <th>Note</th>
      {canEditEvents && (
        <>
          <th>Reports </th>
          <th>Timers</th>
        </>
      )}
    </>
  );
};

function eventRenderer(showId: number): EventRendererType<ScheduleEventDTO> {
  const EventRenderer: EventRendererType<ScheduleEventDTO> = ({
    event: e,
    groupLength,
  }) => {
    const path = usePathname();
    const canEditEvents = useHasPermission()(
      showPermission(showId, PERMISSION.addEvents)
    );
    return (
      <>
        {groupLength && (
          <Td className="whitespace-nowrap" rowSpan={groupLength}>
            {displayDate(e.start)}
          </Td>
        )}
        <TimeRangeWithCurtainsUpCell event={e} />
        <td className="border-l border-slate-200 relative">
          <AvailabilityDropdown event={e} />
        </td>
        <td className="border-l border-slate-200 relative">
          <RolesDescription
            roles={e.roles}
            isShow={!!e.curtainsUp && !e.options?.attendanceRequired}
          />
        </td>

        <Td>
          {e.address && (
            <div className="min-w-60">
              <Address address={e?.address} />
            </div>
          )}
        </Td>
        <Td>{e.shortnote}</Td>

        {canEditEvents && (
          <>
            <td className="border border-slate-200 relative">
              <div className="flex gap-2">
                <Link
                  href={`${path}/event/${e.id}/showreport`}
                  className={cc("link whitespace-nowrap", {
                    ["text-slate-400"]: !e.showReport,
                  })}
                >
                  Show report
                </Link>
                <Link
                  href={`${path}/event/${e.id}/showtimer`}
                  className={cc("link whitespace-nowrap", {
                    ["text-slate-400"]: !e.showTimer,
                  })}
                >
                  Show timer
                </Link>
              </div>
            </td>
            <td className="border border-slate-200 relative">
              <AdminButtons event={e} />
            </td>
          </>
        )}
      </>
    );
  };

  return EventRenderer;
}

const DividerRenderer: DividerRendererType<ScheduleEventDTO> = ({
  event: e,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error>({
    mutationFn: () => api.default.eventsIdDelete({ id: e.id }),
    onError: (e) => {
      showToastError("Could not delete dividier", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EventsList"] });
    },
  });
  return (
    <div className="">
      {e.name}{" "}
      <button onClick={() => mutation.mutate()} className="cursor-pointer">
        {mutation.isLoading ? (
          "Deleting..."
        ) : (
          <TrashIcon className="ml-2 w-4 h-4 inline" />
        )}
      </button>
    </div>
  );
};

const AddDividerButton: FC<{ showId: number }> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  return (
    <>
      <button className="btn mb-2" onClick={open}>
        Add divider
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new divider">
        <EventDividerForm onSuccess={close} showId={showId} />
      </Modal>
    </>
  );
};

const AddEventButton: FC<{ showId: number }> = ({ showId }) => {
  const { Modal, open, close, isOpen } = useModal();
  return (
    <>
      <button className="btn mb-2" onClick={open}>
        Add event
      </button>
      <Modal isOpen={isOpen} close={close} title="Add a new show">
        <EventForm onSuccess={close} showId={showId} />
      </Modal>
    </>
  );
};

const OptionalDisplayName: FC<{ person?: PersonSummaryDTO }> = ({ person }) => {
  if (!person) {
    return null;
  }
  return (
    <>
      {" "}
      <PersonDisplayName person={person} />
    </>
  );
};

const AdminButtons: FC<{ event: ScheduleEventDTO }> = ({ event }) => {
  return (
    <div className="flex">
      <EditEventModal event={event} />
      <CloneEventModal event={event} />
      <DeleteEventModal event={event} />
    </div>
  );
};

const RolesDescription: React.FC<{
  roles?: Array<ScheduleEventDTOAllOfRoles>;
  isShow?: boolean;
}> = ({ roles, isShow }) => {
  return (
    <div className="min-w-28">
      {(!roles || roles.length === 0) && isShow && (
        <span className="italic text-slate-400">Not required</span>
      )}
      {roles?.map((r) => {
        return (
          <div
            key={`${r.id}-${r.type}`}
            className={cc({ ["italic text-slate-400"]: r.coveredBy })}
          >
            <span className={cc({ ["line-through"]: r.coveredBy })}>
              {r.name}
            </span>
            {r.coveredBy && (
              <>
                {" "}
                Not required, covered by{" "}
                <PersonDisplayName person={r.coveredBy} />
              </>
            )}
            {r.type === ScheduleEventDTOAllOfRolesTypeEnum.Covering && (
              <>
                {" "}
                (Covering
                <OptionalDisplayName person={r.covering} />)
              </>
            )}
            {r.type === ScheduleEventDTOAllOfRolesTypeEnum.Shadowing && (
              <>
                {" "}
                (Shadowing
                <OptionalDisplayName person={r.shadowing} />)
              </>
            )}
            {r.shadowedBy && (
              <>
                {" "}
                (Shadowed by{" "}
                {r.shadowedBy.map((s, i) => {
                  if (i === 0) {
                    return <PersonDisplayName key={i} person={s} />;
                  }
                  return (
                    <span key={i}>
                      , <PersonDisplayName person={s} />
                    </span>
                  );
                })}
                )
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
