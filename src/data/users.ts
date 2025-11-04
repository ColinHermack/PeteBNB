const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;
const bcrypt = require('bcrypt');

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
        let hashed = bcrypt.hash(password, 10);
        await collection.insertOne({ userId: crypto.randomUUID(), username: username, password: await hashed, name: name });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function registerUserToken(username: string, token: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Tokens");
        await collection.insertOne({ username: username, token: token });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.close();
    }
}

export async function deregisterUserToken(username: string): Promise<boolean> {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("pete-bnb");
        const collection = db.collection("Tokens");
        await collection.deleteMany({ username: username });
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
        return bcrypt.compare(password, result.password);
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
            username: result.username,
            name: "",
            userId: ""
        }

        collection = db.collection("Users");
        const dbUser = await collection.findOne({ username: result.username });
        if (dbUser != null) {
            user.name = dbUser.name;
            user.userId = dbUser.userID;
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