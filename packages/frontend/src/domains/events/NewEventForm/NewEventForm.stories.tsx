/* eslint-disable */
import NewShowForm from "./NewEventForm";
import { ShowSummaryContext } from "domains/shows/lib/summaryContext";
import { EventDTO, ShowDTO } from "core/api/generated";
import dayjs from "dayjs";

export default {
  title: "EventForm",
};

const show: ShowDTO = {
  id: 1,
  name: "",
  company: "",
  slug: ""
}

export const New = () => (<ShowSummaryContext.Provider value={show}>
  <NewShowForm onSuccess={() => { }} />
</ShowSummaryContext.Provider>);


const event: EventDTO = {
  id: 0,
  start: dayjs('2023-12-01 18:00').toDate(),
  end: dayjs('2023-12-01 22:00').toDate(),
  curtainsUp: dayjs('2023-12-01 19:30').toDate(),
  name: 'Show 2',
  nameRaw: 'Test name',
  shortnote: 'Short note',
  address: '12 smith st'
}

export const Edit = () => (<ShowSummaryContext.Provider value={show}>
  <NewShowForm onSuccess={() => { }} event={event} />
</ShowSummaryContext.Provider>);
