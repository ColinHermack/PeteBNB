import { deregisterUserToken } from '@/data/users';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const status = await deregisterUserToken(body.username);
        if (!status) {
            return new Response("Internal Server Error", { status: 500 });
        }
        return new Response(JSON.stringify({status: "success"}), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}