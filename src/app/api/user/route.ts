import { getUserByToken, User } from '@/data/users';

export async function GET(request: Request) {
    try {
        const body = await request.json();
        const user = await getUserByToken(body.token);

        if (user.userId === "") {
            return new Response("Invalid token", { status: 401 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}