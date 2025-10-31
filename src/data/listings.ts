const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;

import { Listing } from "../models/listing";

export async function getListing(id: string): Promise<Listing | null> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Listings");
        const result = await collection.findOne({ id: id });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
}