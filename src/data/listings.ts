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

export async function getAllListings(): Promise<Listing[]> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Listings");
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await client.close();
    }
}

export async function addNewListing(listerUsername: string, title: string, description: string, price: number, startDate: Date, endDate: Date): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        let collection = db.collection("Users");
        const listerId = (await collection.findOne({ username: listerUsername })).userID;
        collection = db.collection("Listings");
        await collection.insertOne({ id: crypto.randomUUID(), lister: listerId, title: title, description: description, price: price, startdate: startDate, enddate: endDate });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function deleteListing(id: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Listings");
        await collection.deleteOne({ id: id });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function updateListing(id: string, title: string, description: string, price: number, startDate: Date, endDate: Date): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Listings");
        await collection.updateOne({ id: id }, { $set: { title: title, description: description, price: price, startdate: startDate, enddate: endDate } });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}