import { useQuery } from "@tanstack/react-query";
import { useAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import { GetPermissionsForPersonQuery } from "core/gql/graphql";
import { DataMapper } from "core/types";

import { getPermissionsFromString } from "./helpers";
import { UserPermission } from "./types";

export const getPermissionsForPerson = graphql(`
  query GetPermissionsForPerson($personId: ID!) {
    person(id: $personId) {
      data {
        id
        attributes {
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

export const useGetPermissionsForPerson = (personId: string) => {
  const client = useAuthenticatedClient();
  const { isLoading, isError, data } = useQuery(
    ["permissions", { personId }],
    async () => client.request(getPermissionsForPerson, { personId })
  );
  return { isLoading, isError, permissions: mapPermissionsForUser(data) };
};

const mapPermissionsForUser: DataMapper<
  GetPermissionsForPersonQuery,
  Array<UserPermission>
> = (data) => {
  return getPermissionsFromString(
    data?.person?.data?.attributes?.user?.data?.attributes
      ?.permissions as string
  );
};
