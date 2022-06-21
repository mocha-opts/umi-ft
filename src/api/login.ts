import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  res.status(400).json({ error: "This API is not implemented yet." });
}
