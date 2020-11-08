import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../database/db";

export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { gfs } = await connectToDb();
    const docs = await gfs.find().toArray();
    res.json(docs);
  }
}
