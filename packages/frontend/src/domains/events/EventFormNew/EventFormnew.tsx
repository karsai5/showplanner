import EventFormBase from "../EventFormBase/EventFormBase";
import { useCreateEvent } from "../lib/api";

export const EventFormNew: React.FC<{
  showId: string;
  onSuccess: () => void;
}> = ({ onSuccess, showId }) => {
  const createEvent = useCreateEvent(showId, onSuccess);

  return (
    <EventFormBase mutation={createEvent} showId={showId} resetOnSuccess />
  );
};
