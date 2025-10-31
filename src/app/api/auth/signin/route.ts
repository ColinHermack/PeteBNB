import { registerUserToken, deregisterUserToken, verifyUser } from "@/data/users";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verify that the user exists and the password is correct
        const userStatus = await verifyUser(body.username, body.password);
        if (!userStatus) {
            return new Response("Invalid username or password", { status: 401 });
        }

        // Generate user token
        const token = crypto.randomUUID();
        registerUserToken(body.username, token);

        // Return user token
        return new Response(JSON.stringify({token: token}), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}