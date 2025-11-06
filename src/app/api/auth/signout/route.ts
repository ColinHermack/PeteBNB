import { deregisterUserToken, getUserByUsername } from '@/data/users';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const user = await getUserByUsername(body.username);
        const status = await deregisterUserToken(user.userId);
        if (!status) {
            return new Response("Internal Server Error", { status: 500 });
        }
        return new Response(JSON.stringify({status: "success"}), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}