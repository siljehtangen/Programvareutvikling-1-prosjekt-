import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!
const usersCollectionName = process.env.MONGODB_USERS!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // GET: returns user with specific uid
  if (req.method === 'GET') {
    console.log("start")

    let { uid } = req.query;

    if (Array.isArray(uid)) {
      // If uid is an array, use the first value
      uid = uid[0];
    } else if (!uid) {
      // No uid provided in the query string
      return res.status(400).json({ message: 'Please provide a uid' });
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      console.log("start connect")

      await client.connect();
      console.log("connected, start loading")
      const db = client.db(dbName); 
      
      // Find user in the 'users' collection by uid
      const user = await db.collection(usersCollectionName).findOne({_id: uid as any}) // as any because it is manually set as string, not ObjectId
      console.log("finish")
      if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }

      // User found, return the user object
      return res.status(200).json(user);

    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  }
  // POST: Adds a user, or modifies it if exists, returns the user
  if (req.method === 'POST') {

    const userData = req.body;
    const {uid, ...data} = userData

    //const uid = url.searchParams.get("uid")

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      await client.connect();
      const database = client.db(dbName); // Choose a name for your database

      const collection = database.collection(usersCollectionName); // Choose a name for your collection

      // Check if 'uid' is provided
      if (!userData.uid) {
      return res.status(400).json({ message: 'UID is required' });
      }

      // Update the user if exists or add a new one
      const value = await collection.findOneAndUpdate(
        { _id: userData.uid },
        { 
          $set: data, 
          $setOnInsert: { role: "user" } 
        },
        { upsert: true, returnDocument: 'after' }
      );

      // Return the updated/new user
      res.status(201).json({ user: value, message: 'User added/updated successfully!' });
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