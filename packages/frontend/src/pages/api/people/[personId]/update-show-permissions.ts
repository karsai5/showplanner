// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSideAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import { getShowPermissionString } from "core/permissions";
import { getPermissionsForPerson } from "core/permissions/api";
import type { NextApiRequest, NextApiResponse } from "next";

export const updateUser = graphql(`
  mutation UpdateUserPermissions($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          permissions
        }
      }
    }
  }
`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = getServerSideAuthenticatedClient(req);
  const personId = req.query.personId as string;
  const showSlug = req.body.showSlug as string;
  const permissions = req.body.permissions as Array<string>;

  console.log({ personId, showSlug, permissions });

  if (!personId || !showSlug) {
    throw new Error("Missing data");
  }
  const permissionsResult = await client.request(getPermissionsForPerson, {
    personId,
  });
  const userId = permissionsResult?.person?.data?.attributes?.user?.data?.id;

  if (userId === undefined) {
    throw new Error("Could not find user id");
  }

  const oldPermisionsMinusShow = (
    permissionsResult.person?.data?.attributes?.user?.data?.attributes
      ?.permissions || ""
  )
    .split(",")
    .map((p) => p.trim())
    .filter((p) => !p.includes(showSlug));

  const newPermissionsString = [
    ...(oldPermisionsMinusShow || []),
    ...permissions.map((p) => getShowPermissionString(showSlug, p)),
  ].join(",");

  const result = await client.request(updateUser, {
    id: userId as string,
    data: { permissions: newPermissionsString },
  });

  res.status(200).json(result);
}
