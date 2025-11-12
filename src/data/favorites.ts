const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;

import { Listing } from "@/models/listing";

export async function addFavorite(userId: string, listingId: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Favorites");

        await collection.insertOne({ userId: userId, listingId: listingId });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function removeFavorite(userId: string, listingId: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Favorites");

        await collection.deleteOne({ userId: userId, listingId: listingId });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function getFavorites(userId: string): Promise<Listing[]> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        let collection = db.collection("Favorites");
        let result = await collection.find({ userId: userId }).toArray();

        const listingIds = result.map((favorite: { userId: string, listingId: string}) => favorite.listingId);
        
        collection = db.collection("Listings");
        result = await collection.find({ id: { $in: listingIds } }).toArray();

        return result;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await client.close();
    }
}

export async function isFavorite(userId: string, listingId: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");

        const collection = db.collection("Favorites");
        const result = await collection.findOne({ userId: userId, listingId: listingId });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}