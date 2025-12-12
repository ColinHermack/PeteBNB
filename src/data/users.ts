const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;
const crypto = require('crypto');

export type User = {
    userId: string;
    username: string;
    name: string;
}

export async function verifyUsernameAvailability(username: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Users");
        const result = await collection.findOne({ username: username });
        return result === null;
    } catch(error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function addNewUser(username: string, password: string, name: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Users");
        let hashed = await crypto.createHash('sha256').update(password).digest('hex');
        await collection.insertOne({ userId: crypto.randomUUID(), username: username, password: hashed, name: name });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function registerUserToken(userId: string, token: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Tokens");
        await collection.insertOne({ userId: userId, token: token });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function deregisterUserToken(userId: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Tokens");
        await collection.deleteMany({ userId: userId });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function verifyUser(username: string, password: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Users");
        const result = await collection.findOne({ username: username });
        if (result === null) {
            return false;
        }
        let hashed = await crypto.createHash('sha256').update(password).digest('hex');
        return (hashed === result.password);
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function getUserByToken(token: string): Promise<User> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        let collection = db.collection("Tokens");

        const result = await collection.findOne({ token: token });
        if (result == null) {
            return { userId: "", username: "", name: "" };
        }

        const user: User = {
            username: "",
            name: "",
            userId: result.userId
        }

        collection = db.collection("Users");
        const dbUser = await collection.findOne({ userId: result.userId });
        if (dbUser != null) {
            user.name = dbUser.name;
            user.username = dbUser.username;
        }

        return user;
    } catch (error) {
        console.error(error);
        return { userId: "", username: "", name: "" };
    } finally {
        await client.close();
    }
}

export async function getUserByUsername(username: string): Promise<User> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Users");
        const result = await collection.findOne({ username: username });
        return result;
    } catch (error) {
        console.error(error);
        return { userId: "", username: "", name: "" };
    } finally {
        await client.close();
    }
}