/* eslint-disable */
import { EventDTO } from "core/api/generated";
import dayjs from "dayjs";
import { EventForm } from "./EventForm";

export default {
  title: "Forms / New Event",
};

export const New = () => <EventForm onSuccess={() => {}} showId={0} />;

const event: EventDTO = {
  id: 0,
  start: dayjs("2023-12-01 18:00").toDate(),
  end: dayjs("2023-12-01 22:00").toDate(),
  curtainsUp: dayjs("2023-12-01 19:30").toDate(),
  name: "Show 2",
  nameRaw: "Test name",
  shortnote: "Short note",
  address: "12 smith st",
};

export const Edit = () => (
  <EventForm onSuccess={() => {}} event={event} showId={0} />
);
