import { verifyUsernameAvailability, addNewUser, registerUserToken } from "@/data/users";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verify that the username is available
        const usernameAvailable = await verifyUsernameAvailability(body.username);
        if (!usernameAvailable) {
            return new Response("Username already taken", { status: 409 });
        }

        // Add user to database
        const status = await addNewUser(body.username, body.password, body.name);
        if (!status) {
            return new Response("Internal Server Error", { status: 500 });
        }

        // Generate user token
        const token = crypto.randomUUID();
        registerUserToken(body.username, token);

        // Return user token
        return new Response(JSON.stringify({token: token, username: body.username, name: body.name}), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}