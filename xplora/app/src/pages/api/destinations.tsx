import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!
const destinationsCollectionName = process.env.MONGODB_DESTINATIONS!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // GET: returns user with specific uid
  if (req.method === 'GET') {

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {

      await client.connect();
      const db = client.db(dbName); 
      
      // Find user in the 'users' collection by uid
      const destinations = await db.collection(destinationsCollectionName).find({}).toArray() 
      if (!destinations) {
        // Destinations not found
        return res.status(404).json({ message: 'Destination not found' });
      }

      // User found, return the user object
      return res.status(200).json(destinations);

    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}