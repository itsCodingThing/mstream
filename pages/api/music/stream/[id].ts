import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../../database/db";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gfs } = await connectToDb();

  if (req.method === "GET") {
    const songID = req.query.id;

    if (typeof songID === "string") {
      const id = mongoose.Types.ObjectId(songID);
      gfs.openDownloadStream(id).pipe(res);
    }
  }
}
