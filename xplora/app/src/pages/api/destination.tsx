import { Destination } from "@/lib/types";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!
const destinatonsCollectionName = process.env.MONGODB_DESTINATIONS!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // GET: returns user with specific id
  if (req.method === 'GET') {

    let { id } = req.query;

    if (Array.isArray(id)) {
      // If uid is an array, use the first value
      id = id[0];
    } else if (!id) {
      // No uid provided in the query string
      return res.status(400).json({ message: 'Please provide a id' });
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
      const destination = await db.collection(destinatonsCollectionName).findOne({_id: new ObjectId(id)}) 
      if (!destination) {
        // User not found
        return res.status(404).json({ message: 'Destionation not found' });
      }

      // User found, return the user object
      return res.status(200).json(destination);

    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  }
  // POST: Adds a user, or modifies it if exists, returns the user
  if (req.method === 'POST') {

    const destinationData: Destination = req.body;

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

      const collection = database.collection(destinatonsCollectionName); // Choose a name for your collection

      // Check if fields are provided
      const requiredFields = ['title', 'country', 'description', 'activities', 'priceClass', 'imgSrc', 'continent', 'language', 'temperature', 'population'];
      const hasAllRequiredFields = requiredFields.every(field => destinationData[field as keyof Destination] !== undefined && destinationData[field as keyof Destination] !== '');

      if (!hasAllRequiredFields) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      if (destinationData._id) {
        // Update the user if exists or add a new one
        const objectId = new ObjectId(destinationData._id);
        const value = await collection.findOneAndUpdate(
          { _id: new ObjectId(destinationData._id) },
          { 
            $set: {
              title: destinationData.title,
              country: destinationData.country,
              description: destinationData.description,
              activities: destinationData.activities,
              priceClass: destinationData.priceClass,
              imgSrc: destinationData.imgSrc,
              continent: destinationData.continent,
              language: destinationData.language,
              temperature: Number(destinationData.temperature),
              population: Number(destinationData.population)
            }, 
          },
          { upsert: true, returnDocument: 'after' }
        )

        // Return the updated/new user
        res.status(201).json({ user: value, message: 'Destination updated successfully!' });
      }

      else {
        const value = await collection.insertOne(
          {
            title: destinationData.title,
            country: destinationData.country,
            description: destinationData.description,
            activities: destinationData.activities,
            priceClass: destinationData.priceClass,
            imgSrc: destinationData.imgSrc,
            continent: destinationData.continent,
            language: destinationData.language,
            temperature: Number(destinationData.temperature),
            population: Number(destinationData.population)
          },
        )

        // Return the updated/new user
        res.status(201).json({ destination: value, message: 'Destination added successfully!' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  }
  else if (req.method === 'DELETE') {

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
      
      // Parse _id from the request body
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'An id must be provided' });
      }

      const result = await db.collection(destinatonsCollectionName).deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      return res.status(200).json({ message: 'Destination deleted successfully' });
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