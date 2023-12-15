import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import { GetRoleGroupsQuery, ShowroleInput } from "core/gql/graphql";
import { DataMapper } from "core/types";
import { toast } from "react-toastify";

const mapRoleGroupsForShow: DataMapper<
  GetRoleGroupsQuery,
  Array<{ id: string; name: string }>
> = (data) => {
  if (!data || !data?.showRoleGroups?.data) {
    return undefined;
  }
  return data?.showRoleGroups?.data?.map((showRoleGroup) => ({
    id: showRoleGroup.id as string,
    name: showRoleGroup.attributes?.name as string,
  }));
};

export const useDeleteRole = () => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: (id: string) => {
      return client.request(
        graphql(`
          mutation DeleteRole($id: ID!) {
            deleteShowrole(id: $id) {
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
      toast.error("Something went wrong deleting the role");
      console.error("Could not delete role", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`showroles`] });
    },
  });
  return mutation;
};

export const useAddRole = () => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: ({
      name,
      showRoleGroup,
    }: {
      name: string;
      showRoleGroup: string;
    }) =>
      client.request(
        graphql(`
          mutation CreateRole($data: ShowroleInput!) {
            createShowrole(data: $data) {
              data {
                id
              }
            }
          }
        `),
        { data: { name, show_role_group: showRoleGroup, rostered: false } }
      ),
    onError: (e) => {
      toast.error("Something went wrong creating the show role");
      console.error("Could not create role", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`showroles`] });
    },
  });
  return mutation;
};

export const useUpdateRole = () => {
  const client = useAuthenticatedClient();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: ({ id, data }: { id: string; data: Partial<ShowroleInput> }) =>
      client.request(
        graphql(`
          mutation UpdateRole($id: ID!, $data: ShowroleInput!) {
            updateShowrole(id: $id, data: $data) {
              data {
                id
              }
            }
          }
        `),
        { id, data }
      ),
    onError: (e) => {
      toast.error("Something went wrong updating the show role");
      console.error("Could not udpate role", e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`showroles`] });
    },
  });
  return mutation;
};
