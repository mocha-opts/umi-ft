import type { UmiApiRequest, UmiApiResponse } from "umi";
import data from "src/services/mindmap.json";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  res.status(200).json(data);
}
