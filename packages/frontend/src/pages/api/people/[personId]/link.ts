// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSideAuthenticatedClient } from "core/config";
import { graphql } from "core/gql";
import type { NextApiRequest, NextApiResponse } from "next";

export const getPerson = graphql(`
  query GetPersonForUnlink($id: ID) {
    person(id: $id) {
      data {
        id
        attributes {
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

export const updatePerson = graphql(`
  mutation UpdatePerson($id: ID!, $data: PersonInput!) {
    updatePerson(id: $id, data: $data) {
      data {
        id
        attributes {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = getServerSideAuthenticatedClient(req);
  const personId = req.query.personId as string;
  const showId = req.body.showId as string;
  if (!personId || !showId) {
    throw new Error("Missing data");
  }
  const getPersonResult = await client.request(getPerson, { id: personId });
  let showIds = getPersonResult.person?.data?.attributes?.shows?.data?.map(
    (show) => show.id
  ) as Array<string>;
  if (!showIds) {
    throw new Error("No shows found on person");
  }
  showIds = [...showIds, showId];

  const result = await client.request(updatePerson, {
    id: personId as string,
    data: { shows: showIds },
  });

  res.status(200).json(result);
}
