export type Availability = {
  id: string;
  eventId: string;
  personId: string;
  availability?: boolean;
};

export type EventAvailabilities = {
  id: string;
  start: string;
  end: string;
  name: string;
  shortnote?: string;
  curtainsUp?: string | null;
  availabilites: Array<Omit<Availability, "eventId">>;
};
