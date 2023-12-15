import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import {
  GetAvailabilitiesForPersonAndShowQuery,
  GetAvailabilitiesForShowQuery,
} from "core/gql/graphql";
import { DataMapper } from "core/types";
import { useLoggedInUser } from "domains/authentication/lib/session";
import { toast } from "react-toastify";

import { Availability, EventAvailabilities } from "./types";

const getAvailabilitiesForPersonAndShow = graphql(`
  query GetAvailabilitiesForPersonAndShow($personId: ID, $showId: ID) {
    availabilities(
      filters: {
        person: { id: { eq: $personId } }
        event: { show: { id: { eq: $showId } } }
      }
    ) {
      data {
        id
        attributes {
          available
        }
        attributes {
          person {
            data {
              id
            }
          }
          event {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

const getAvailabilitiesForShow = graphql(`
  query GetAvailabilitiesForShow($showId: ID) {
    events(filters: { show: { id: { eq: $showId } } }, sort: "start:asc") {
      data {
        id
        attributes {
          start
          end
          name
          curtainsUp
          availabilities {
            data {
              id
              attributes {
                available
                person {
                  data {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

const createAvailability = graphql(`
  mutation CreateAvailability($data: AvailabilityInput!) {
    createAvailability(data: $data) {
      data {
        id
        attributes {
          available
        }
        attributes {
          person {
            data {
              id
            }
          }
          event {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

const updateAvailability = graphql(`
  mutation UpdateAvailability($id: ID!, $data: AvailabilityInput!) {
    updateAvailability(id: $id, data: $data) {
      data {
        id
        attributes {
          available
        }
        attributes {
          person {
            data {
              id
            }
          }
          event {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

export const useGetAvailabilitiesForPerson = (
  personId: string,
  showId: string
) => {
  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(
    ["availabilities", { showId, personId }],
    async () =>
      client.request(getAvailabilitiesForPersonAndShow, { personId, showId })
  );
  return { isLoading, isError, availabilities: mapAvailabilities(data) };
};

export const useAvailabilitiesForShow = (showId: string) => {
  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(
    ["availabilities", { showId }],
    async () => client.request(getAvailabilitiesForShow, { showId })
  );
  return { isLoading, isError, events: mapEventAvailabilities(data) };
};

export const useUpdateAvailability = (
  availability: Availability | undefined,
  eventId: string | number
) => {
  const user = useLoggedInUser();
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (value: boolean) => {
      if (availability) {
        return client.request(updateAvailability, {
          id: availability.id,
          data: { available: value },
        });
      }
      return client.request(createAvailability, {
        data: {
          available: value,
          event: eventId.toString(),
          person: user?.person.id,
          publishedAt: new Date(),
        },
      });
    },
    onError: (e: any) => {
      toast.error("Could not update availability");
      console.error("Could not update availability", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`availabilities`] });
    },
  });
  return mutation;
};

const mapAvailabilities: DataMapper<
  GetAvailabilitiesForPersonAndShowQuery,
  Array<Availability>
> = (data) => {
  if (!data || !data?.availabilities?.data) {
    return undefined;
  }
  return data?.availabilities?.data?.map((availability) => ({
    id: availability?.id as string,
    personId: availability?.attributes?.person?.data?.id as string,
    eventId: availability?.attributes?.event?.data?.id as string,
    availability: availability?.attributes?.available as boolean | undefined,
  }));
};

const mapEventAvailabilities: DataMapper<
  GetAvailabilitiesForShowQuery,
  Array<EventAvailabilities>
> = (data) => {
  if (!data || !data?.events?.data) {
    return undefined;
  }
  return data?.events?.data?.map((event) => ({
    id: event.id,
    start: event?.attributes?.start as string,
    end: event?.attributes?.end as string,
    name: event?.attributes?.name as string,
    curtainsUp: event?.attributes?.curtainsUp as string,
    availabilites: (event?.attributes?.availabilities?.data || []).map((a) => ({
      id: a.id,
      availability: a.attributes?.available,
      personId: a?.attributes?.person?.data?.id,
    })),
  }));
  // return data?.availabilities?.data?.map((availability) => ({
  //   id: availability?.id as string,
  //   personId: availability?.attributes?.person?.data?.id as string,
  //   eventId: availability?.attributes?.event?.data?.id as string,
  //   availability: availability?.attributes?.available as boolean | undefined,
  // }));
};
