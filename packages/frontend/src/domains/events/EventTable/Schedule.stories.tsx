/* eslint-disable */
import { EventDTO } from 'core/api/generated';
import dayjs from 'dayjs';
import { Schedule } from './Schedule';

export default {
  title: 'Events table/Admin',
};

export const Default = () => (
  <div>
    <Schedule events={events} />
  </div>
);

Default.story = {
  name: 'default',
};

const events: Array<EventDTO> = [
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
