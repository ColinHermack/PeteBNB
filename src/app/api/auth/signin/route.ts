import { User, registerUserToken, deregisterUserToken, verifyUser, getUserByUsername } from "@/data/users";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verify that the user exists and the password is correct
        const userStatus = await verifyUser(body.username, body.password);
        if (!userStatus) {
            return new Response("Invalid username or password", { status: 401 });
        }

        const user: User = await getUserByUsername(body.username);
        console.log(user);

        // Generate user token
        const token = crypto.randomUUID();
        deregisterUserToken(user.userId);
        registerUserToken(user.userId, token);
        
        // Return user token
        return new Response(JSON.stringify({token: token, username: user.username, name: user.name}), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}