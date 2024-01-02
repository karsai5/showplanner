/* eslint-disable */
import { EventTable } from "./EventTable";

export default {
  title: "Events table",
};


export const Default = () => (<div>
  <EventTable events={events} />
</div>);

Default.story = {
  name: "default",
};

const events = [
  {
    "id": 1,
    "showId": 1,
    "start": "2023-12-13T21:28:04.246Z"
  },
  {
    "id": 2,
    "showId": 1,
    "start": "2023-12-13T21:28:04.246Z"
  },
  {
    "id": 3,
    "showId": 1,
    "start": "2023-12-13T21:28:04.246Z"
  },
  {
    "id": 4,
    "showId": 1,
    "start": "2023-12-31T23:30:00.000Z"
  },
  {
    "id": 5,
    "showId": 1,
    "start": "1992-12-31T23:30:00.000Z"
  },
  {
    "id": 6,
    "showId": 1,
    "start": "1993-01-01T22:00:00.000Z"
  },
  {
    "id": 7,
    "showId": 1,
    "start": "2024-01-02T23:30:00.000Z",
    "end": "2024-01-03T01:00:00.000Z"
  },
  {
    "id": 9,
    "showId": 1,
    "start": "2024-01-25T23:30:00.000Z"
  },
  {
    "id": 8,
    "showId": 1,
    "start": "2024-01-02T23:30:00.000Z",
    "name": "Show 1",
    "curtainsUp": "2024-01-03T08:00:00.000Z"
  },
  {
    "id": 11,
    "showId": 1,
    "start": "2024-01-03T07:00:00.000Z",
    "name": "Event name",
    "shortnote": "Note",
    "address": "Riverside Theatres, Church Street, Parramatta NSW, Australia",
    "curtainsUp": "2024-01-03T08:30:00.000Z"
  },
  {
    "id": 10,
    "showId": 1,
    "start": "2024-01-10T07:00:00.000Z",
    "name": "Show 3",
    "curtainsUp": "2024-01-10T08:30:00.000Z",
    "end": "2024-01-10T11:30:00.000Z"
  },
  {
    "id": 12,
    "showId": 1,
    "start": "2024-01-11T08:00:00.000Z",
    "name": "Custom name",
    "curtainsUp": "2024-01-11T08:30:00.000Z"
  }
]
