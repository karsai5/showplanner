import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import { toast } from "react-toastify";

import { CreateEvent } from "./types";

const createEvent = graphql(`
  mutation CreateEvent($data: EventInput!) {
    createEvent(data: $data) {
      data {
        id
        ...EditEvent_EventFragment
      }
    }
  }
`);

const updateEvent = graphql(`
  mutation UpdateEvent($id: ID!, $data: EventInput!) {
    updateEvent(id: $id, data: $data) {
      data {
        id
        ...EditEvent_EventFragment
      }
    }
  }
`);

const deleteEvent = graphql(`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      data {
        id
        ...EditEvent_EventFragment
      }
    }
  }
`);

const getEvent = graphql(`
  query GetEvent($eventId: ID!) {
    event(id: $eventId) {
      data {
        ...EditEvent_EventFragment
      }
    }
  }
`);

const getEvents = graphql(`
  query GetEvents($showId: ID!) {
    events(
      filters: { show: { id: { eq: $showId } } }
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          start
          end
          name
          shortnote
          curtainsUp
          requiresAvailabilities
          publishedAt
          location {
            name
            address
            lat
            lng
          }
          show {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

const EditEvent_EventFragment = graphql(`
  fragment EditEvent_EventFragment on EventEntity {
    id
    attributes {
      start
      end
      name
      shortnote
      curtainsUp
      requiresAvailabilities
      publishedAt
      location {
        name
        address
        lat
        lng
      }
      show {
        data {
          id
          attributes {
            slug
          }
        }
      }
    }
  }
`);

export const useGetEvent = (eventId: string) => {
  const client = useAuthenticatedClient();
  return useQuery(["event", { id: eventId }], async () =>
    client.request(getEvent, { eventId })
  );
};

export const useGetEvents = (showId: string) => {
  const client = useAuthenticatedClient();
  return useQuery(["events", { showId }], async () =>
    client.request(getEvents, { showId })
  );
};

export const useCreateEvent = (showId: string, onSuccess: () => void) => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: (data: CreateEvent) => client.request(createEvent, { data }),
    onError: (e) => {
      toast.error("Something went wrong creating the event");
      console.error("Could not create show", e);
    },
    onSuccess: () => {
      toast.success("Succesfully created a new event");
      queryClient.invalidateQueries({ queryKey: [`events`, { showId }] });
      onSuccess();
    },
  });
  return mutation;
};

export const useUpdateEventMutation = (
  eventId: string,
  onSuccess: () => void
) => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, CreateEvent>({
    mutationFn: (data) => client.request(updateEvent, { id: eventId, data }),
    onError: (e) => {
      toast.error("Something went wrong updating the event");
      console.error("Could not create show", e);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [
          `events`,
          { showId: result.updateEvent.data.attributes.show.data.id },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [`event`, { id: result.updateEvent.data.id }],
      });
      onSuccess();
    },
  });
  return mutation;
};

export const useDeleteEventMuation = (eventId: string, showId: string) => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.request(deleteEvent, { id: eventId }),
    onError: (e) => {
      toast.error("Could not delete event");
      console.error("Could not delete event", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`events`, { showId }] });
      close();
    },
  });
  return mutation;
};
