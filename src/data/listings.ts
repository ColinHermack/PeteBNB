const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;

import { User } from "@/models/user";
import { Listing, DwellingType } from "@/models/listing";

export async function getListing(id: string): Promise<Listing | null> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        let collection = db.collection("Listings");
        const result = await collection.findOne({ id: id });


        if (result === null) {
            return null;
        }

        collection = db.collection("Users");
        const lister = await collection.findOne({ userId: result.lister });

        if (lister === null) {
            return null;
        }

        let retVal: Listing = {
            id: result.id,
            address: result.address,
            title: result.title,
            type: result.type,
            bedrooms: result.bedrooms,
            lister: {
                username: lister.username,
                name: lister.name
            },
            description: result.description,
            cost: result.cost,
            startDate: result.startdate,
            endDate: result.enddate
        };

        return retVal;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
}

export async function getManyListings(maxPrice: number | null = Number.MAX_SAFE_INTEGER, numBedrooms: number | null = Number.MAX_SAFE_INTEGER, type: string | null = ""): Promise<Listing[]> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Listings");

        if (maxPrice === null) {
            maxPrice = Number.MAX_SAFE_INTEGER;
        }
        if (numBedrooms === null) {
            numBedrooms = Number.MIN_SAFE_INTEGER;
        }
        if (type === null) {
            type = "";
        }

        if (type === "") {
            const result = await collection.find({ cost: { $lte: maxPrice }, bedrooms: { $gte: numBedrooms } }).toArray();
            return result;
        } 

        const result = await collection.find({ cost: { $lte: maxPrice }, bedrooms: { $gte: numBedrooms }, type: type }).toArray();
        return result;
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await client.close();
    }
}

export async function addNewListing(listerId: string, address: string, title: string, type: DwellingType, bedrooms: number, description: string, cost: number, startDate: Date, endDate: Date): Promise<string | null> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        
        const collection = db.collection("Listings");

        const newId = crypto.randomUUID();
        await collection.insertOne({
            id: newId,
            address: address,
            title: title,
            type: type,
            bedrooms: bedrooms,
            lister: listerId,
            description: description,
            cost: cost,
            startDate: startDate,
            endDate: endDate
        })

        return newId;
    } catch (error) {
        console.error(error);
        return null;
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

export async function updateListing(
    id: string,
    address: string | null = null,
    title: string | null = null,
    type: DwellingType | null = null,
    bedrooms: number | null = null,
    lister: User | null = null,
    description: string | null = null,
    price: number | null = null,
    startDate: Date | null = null,
    endDate: Date | null = null
): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        let collection = db.collection("Listings");

        const args = {
            address: address,
            title: title,
            type: type,
            bedrooms: bedrooms,
            lister: lister,
            description: description,
            cost: price,
            startDate: startDate,
            endDate: endDate
        };

        for (const [key, value] of Object.entries(args)) {
            if (value !== null) {
                collection = await collection.updateOne({ id: id }, { $set: { [key]: value } });
            }
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}