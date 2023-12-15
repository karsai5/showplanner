// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSideAuthenticatedClient } from "core/config";
import type { NextApiRequest, NextApiResponse } from "next";

import { getPerson, updatePerson } from "./link";

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
  let shows = getPersonResult.person?.data?.attributes?.shows?.data?.map(
    (show) => show.id
  ) as Array<string>;
  if (!shows) {
    throw new Error("No shows found on person");
  }
  shows = shows.filter((show) => show !== showId);

  const result = await client.request(updatePerson, {
    id: personId as string,
    data: { shows },
  });

  res.status(200).json(result);
}
