import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import { GetRoleGroupsQuery } from "core/gql/graphql";
import { DataMapper } from "core/types";
import { toast } from "react-toastify";

import { RoleGroup } from "../types";

export const useRoleGroupsForShow = (showId: string) => {
  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(
    ["showroles", { showId }],
    async () =>
      client.request(
        graphql(`
          query GetRoleGroups($showId: ID) {
            showRoleGroups(filters: { show: { id: { eq: $showId } } }) {
              data {
                id
                attributes {
                  name
                  show_roles {
                    data {
                      id
                      attributes {
                        name
                        rostered
                        note
                      }
                    }
                  }
                }
              }
            }
          }
        `),
        { showId }
      )
  );
  return { isLoading, isError, roleGroups: mapRoleGroupsForShow(data) };
};

export const useDeleteRoleGroup = () => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: (id: string) => {
      return client.request(
        graphql(`
          mutation DeleteRoleGroup($id: ID!) {
            deleteShowRoleGroup(id: $id) {
              data {
                id
              }
            }
          }
        `),
        { id }
      );
    },
    onError: (e) => {
      toast.error("Something went wrong creating the role group");
      console.error("Could not role group", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`showroles`] });
    },
  });
  return mutation;
};

export const useAddRoleGroup = (showId: string, onSuccess?: () => void) => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: (name: string) =>
      client.request(
        graphql(`
          mutation CreateRoleGroup($data: ShowRoleGroupInput!) {
            createShowRoleGroup(data: $data) {
              data {
                id
              }
            }
          }
        `),
        { data: { show: showId, name } }
      ),
    onError: (e) => {
      toast.error("Something went wrong creating the role group");
      console.error("Could not role group", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`showroles`, { showId }] });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
  return mutation;
};

const mapRoleGroupsForShow: DataMapper<GetRoleGroupsQuery, Array<RoleGroup>> = (
  data
) => {
  if (!data || !data?.showRoleGroups?.data) {
    return undefined;
  }
  return data?.showRoleGroups?.data?.map((showRoleGroup) => ({
    id: showRoleGroup.id as string,
    name: showRoleGroup.attributes?.name as string,
    roles:
      showRoleGroup.attributes?.show_roles?.data?.map((role) => ({
        id: role.id as string,
        name: role.attributes?.name as string,
        rostered: role.attributes?.rostered as boolean,
        note: role.attributes?.note as string,
      })) || [],
  }));
};
