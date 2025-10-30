import { verifyUsernameAvailability } from "@/data/users";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verify that the username is available
        const usernameAvailable = await verifyUsernameAvailability(body.username);
        if (!usernameAvailable) {
            return new Response("Username already taken", { status: 409 });
        }

        //TODO: Add user to database

        //TODO: Generate user token

        //TODO: Return user token

        return new Response("OK", { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}