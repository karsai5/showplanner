import { CrossIcon } from "core/components/Icons";

import EventFormBase from "../EventFormBase/EventFormBase";
import { useCreateEvent, useGetEvent } from "../lib/api";

export const EventFormCopy: React.FC<{
  showId: string;
  onSuccess: () => void;
  eventId: string;
}> = ({ onSuccess, showId, eventId }) => {
  const mutation = useCreateEvent(showId, onSuccess);
  const { data, isLoading, isError } = useGetEvent(eventId);

  if (isLoading) {
    return <progress className="progress w-full"></progress>;
  }

  if (isError) {
    return (
      <div className="alert alert-error mb-4">
        <CrossIcon />
        <span> Error getting event </span>
      </div>
    );
  }

  const attributes = (data.event?.data as any)?.attributes;

  const defaultValues = {
    start: attributes?.start,
    end: attributes?.end,
    show: attributes?.show?.data?.id as string,
    name: attributes?.name as string,
    shortnote: attributes?.shortnote as string,
    curtainsUp: attributes?.curtainsUp as string,
    requiresAvailabilities: attributes?.requiresAvailabilities as boolean,
    publishedAt: attributes?.publishedAt,
    location: attributes?.location,
    id: eventId,
  };

  return (
    <EventFormBase
      mutation={mutation}
      showId={showId}
      defaultValues={defaultValues}
    />
  );
};
