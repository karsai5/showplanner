import { Config } from "core/utils/config";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
  res.status(200).send(Config.version);
}
