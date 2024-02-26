/* eslint-disable */
import dayjs from 'dayjs';
import { EventTable } from './EventTable';

export default {
  title: 'Events table',
};

export const Default = () => (
  <div>
    <EventTable events={events} />
  </div>
);

Default.story = {
  name: 'default',
};

const events = [
  {
    id: 1,
    showId: 1,
    start: dayjs('2023-12-13T21:28:04.246Z').toDate(),
  },
  {
    id: 2,
    showId: 1,
    start: dayjs('2023-12-13T21:28:04.246Z').toDate(),
  },
  {
    id: 3,
    showId: 1,
    start: dayjs('2023-12-13T21:28:04.246Z').toDate(),
  },
  {
    id: 4,
    showId: 1,
    start: dayjs('2023-12-13T21:28:04.246Z').toDate(),
  },
  {
    id: 10,
    showId: 1,
    start: dayjs('2023-12-13T21:28:04.246Z').toDate(),
    name: 'Show 3',
    curtainsUp: dayjs('2023-12-13T21:28:04.246Z').toDate(),
    end: dayjs('2023-12-13T21:28:04.246Z').toDate(),
  },
];
