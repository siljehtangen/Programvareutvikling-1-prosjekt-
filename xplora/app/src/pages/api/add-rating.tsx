import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;
const destinationsCollectionName = process.env.MONGODB_DESTINATIONS!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Only allow POST requests
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { destinationId, userId, rating, title, description } = req.body;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(destinationsCollectionName);

    // First, try to update an existing rating by the same user
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(destinationId), "ratings.userId": userId },
      {
        $set: {
          "ratings.$.rating": rating,
          "ratings.$.title": title,
          "ratings.$.description": description,
          "ratings.$.date": new Date(),
        },
      }
    );

    // If no existing rating by the user was found, add a new rating
    if (updateResult.matchedCount === 0) {
      await collection.updateOne(
        { _id: new ObjectId(destinationId) },
        {
          $push: {
            ratings: {
              userId,
              rating,
              title,
              description,
              date: new Date(),
            },
          },
        }
      );
    }

    res.status(200).json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Failed to update rating' });
  } finally {
    await client.close();
  }
}
