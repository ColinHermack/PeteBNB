const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;

import type { Dwelling } from "../models/dwelling";

export async function getAllDwellings(): Promise<Dwelling[]> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Dwellings");
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await client.close();
    }
}

export async function getDwelling(id: string): Promise<Dwelling> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Dwellings");
        const result = await collection.findOne({ id: id });
        return result;
    } catch (error) {
        console.error(error);
        return {} as Dwelling;
    } finally {
        await client.close();
    }
}

export async function addNewDwelling(address: string, type: string, description: string, features: string[]): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Dwellings");
        await collection.insertOne({ id: crypto.randomUUID(), address: address, type: type, description: description, features: features });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function deleteDwelling(id: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Dwellings");
        await collection.deleteOne({ id: id });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function updateDwelling(id: string, address: string, type: string, description: string, features: string[]): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Dwellings");
        await collection.updateOne({ id: id }, { $set: { address: address, type: type, description: description, features: features } });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function getDwellingsByType(type: string): Promise<Dwelling[]> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Dwellings");
        const result = await collection.find({ type: type }).toArray();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await client.close();
    }
}