import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useAuthenticatedAxiosClient,
  useAuthenticatedClient,
} from "core/config";
import { graphql } from "core/gql";
import {
  GetPeopleForShowQuery,
  GetPeopleQuery,
  PersonEntity,
} from "core/gql/graphql";
import { getImageUrl } from "core/images";
import { getPermissionsFromString } from "core/permissions";
import { DataMapper } from "core/types";
import { toast } from "react-toastify";

import { Person } from "../types";

export * from "./roleGroups";
export * from "./roles";

export const useUpdatePersonPermissionsForShowMutation = (
  personId: string,
  showSlug: string
) => {
  const queryClient = useQueryClient();
  const client = useAuthenticatedAxiosClient("/api");
  const mutation = useMutation({
    mutationFn: (permissions: Array<string>) =>
      client.post(`/people/${personId}/update-show-permissions`, {
        showSlug,
        permissions,
      }),
    onError: (e) => {
      toast.error("Could not update permissions");
      console.error("Could not update permissiosn", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`permissions`],
      });
      queryClient.invalidateQueries({
        queryKey: [`people`],
      });
    },
  });
  return mutation;
};

export const useDeletePersonMuation = (personId: string, showId: string) => {
  const queryClient = useQueryClient();
  const client = useAuthenticatedAxiosClient("/api");
  const mutation = useMutation({
    mutationFn: () => client.post(`/people/${personId}/unlink`, { showId }),
    onError: (e) => {
      toast.error("Could not delete person");
      console.error("Could not delete person", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`people`, { showId }] });
      close();
    },
  });
  return mutation;
};

export const useAddPersonToShowMutation = () => {
  const queryClient = useQueryClient();
  const client = useAuthenticatedAxiosClient("/api");
  const mutation = useMutation({
    mutationFn: ({ personId, showId }: { personId: string; showId: string }) =>
      client.post(`/people/${personId}/link`, { showId }),
    onError: (e) => {
      toast.error("Could not link person");
      console.error("Could not link person", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
      close();
    },
  });
  return mutation;
};

const getPeople = graphql(`
  query GetPeople {
    people {
      data {
        id
        attributes {
          firstname
          lastname
          avatar {
            data {
              attributes {
                formats
              }
            }
          }
          shows {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

const getPeopleForShow = graphql(`
  query GetPeopleForShow($showId: ID) {
    people(filters: { shows: { id: { eq: $showId } } }) {
      data {
        id
        attributes {
          firstname
          lastname
          avatar {
            data {
              attributes {
                formats
              }
            }
          }
          shows {
            data {
              id
            }
          }
          user {
            data {
              id
              attributes {
                permissions
              }
            }
          }
        }
      }
    }
  }
`);

export const useGetPeopleForShow = (showId: string) => {
  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(
    ["people", { showId }],
    async () => client.request(getPeopleForShow, { showId })
  );
  return { isLoading, isError, people: mapPeopleForShow(data) };
};

export const useGetPeople = () => {
  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(["people"], async () =>
    client.request(getPeople)
  );
  return { isLoading, isError, people: mapPeople(data) };
};

const getAvatar = (person: PersonEntity) =>
  getImageUrl(person?.attributes?.avatar, "small") ||
  `https://api.dicebear.com/5.x/thumbs/svg?seed=${person.attributes?.firstname}${person.attributes?.lastname}`;

const mapPeople: DataMapper<GetPeopleQuery, Array<Person>> = (data) => {
  if (!data || !data?.people?.data) {
    return undefined;
  }
  return data?.people?.data?.map((person) => ({
    id: person.id as string,
    firstname: person.attributes?.firstname as string,
    lastname: person.attributes?.lastname as string,
    avatar: getAvatar(person as PersonEntity),
    shows:
      person.attributes?.shows?.data.map((show) => show.id as string) || [],
  }));
};

const mapPeopleForShow: DataMapper<GetPeopleForShowQuery, Array<Person>> = (
  data
) => {
  if (!data || !data?.people?.data) {
    return undefined;
  }
  return data?.people?.data?.map((person) => ({
    id: person.id as string,
    firstname: person.attributes?.firstname as string,
    lastname: person.attributes?.lastname as string,
    avatar: getAvatar(person as PersonEntity),
    shows:
      person.attributes?.shows?.data.map((show) => show.id as string) || [],
    user: person.attributes?.user?.data?.id as string,
    permissions: getPermissionsFromString(
      person.attributes?.user?.data?.attributes?.permissions as string
    ),
  }));
};
