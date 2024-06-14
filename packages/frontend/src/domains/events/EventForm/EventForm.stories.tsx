/* eslint-disable */
import { ShowSummaryContext } from "domains/shows/lib/summaryContext";
import { EventDTO, ShowDTO } from "core/api/generated";
import dayjs from "dayjs";
import { EventForm } from "./EventForm";

export default {
  title: "Forms / New Event",
};

const show: ShowDTO = {
  id: 1,
  name: "",
  company: "",
  slug: "",
};

export const New = () => (
  <ShowSummaryContext.Provider value={show}>
    <EventForm onSuccess={() => {}} showId={0} />
  </ShowSummaryContext.Provider>
);

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
  <ShowSummaryContext.Provider value={show}>
    <EventForm onSuccess={() => {}} event={event} showId={0} />
  </ShowSummaryContext.Provider>
);
