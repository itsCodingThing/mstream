import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../../database/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gfs } = await connectToDb();

  if (req.method === "POST" && req.headers["content-type"] === "audio/mpeg") {
    const songName = req.query.name;

    if (typeof songName === "string") {
      const uploadStream = gfs.openUploadStream(songName);
      req.pipe(uploadStream);
      res.json({ ok: true });
    }
  }
}
