import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();
  try {
    if (method === "GET") {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 })
        .toArray();

      res.status(200).json(posts);
    }

    if (method === "POST") {
      const post = await db
        .collection("posts")
        .insertOne({ ...body, timestamp: new Timestamp() });

      res.status(201).json(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
