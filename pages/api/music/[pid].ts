import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../database/db";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gfs } = await connectToDb();

  if (req.method === "POST" && req.headers["content-type"] === "audio/mpeg") {
    const songName = req.query.pid;

    if (typeof songName === "string") {
      const uploadStream = gfs.openUploadStream(songName);
      req.pipe(uploadStream);

      uploadStream.on("error", (err) => {
        console.log(err);
        res.json({ ok: false, error: "Something went wrong in uploading song to database!!!" });
      });

      uploadStream.on("close", () => {
        console.log(`upload of ${songName} is complete`);
        res.json({ ok: true });
      });
    }
  }

  if (req.method === "GET") {
    const songID = req.query.pid;

    if (typeof songID === "string") {
      const id = mongoose.Types.ObjectId(songID);
      gfs.openDownloadStream(id).pipe(res);
    }
  }
}
