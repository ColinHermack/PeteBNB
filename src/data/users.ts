const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;
const bcrypt = require('bcrypt');

export async function verifyUsernameAvailability(username: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("users");
        const result = await collection.findOne({ username: username });
        return result === null;
    } catch(error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function addNewUser(username: string, password: string, name: string) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("users");
        bcrypt.hash(password, 10, async function(err: any, hash: string) {
            if (err) {
                console.error(err);
            } else {
                await collection.insertOne({ userID: crypto.randomUUID(),username: username, password: hash, name: name });
            }  
        })
        
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}