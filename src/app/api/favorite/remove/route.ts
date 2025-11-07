import { removeFavorite } from '@/data/favorites';
import { getUserByToken } from '@/data/users';

export async function POST(request: Request) {
    try {
        const token = request.headers.get('authorization');
        if (token === null) {
            return new Response("No credentials provided", { status: 401 });
        }

        const user = await getUserByToken(token.trim());
        if (user.userId === '') {
            return new Response("Invalid token", { status: 401 });
        }

        const body = await request.json();

        if (body === null) {
            return new Response("No listing id provided", { status: 400 });
        }

        const success = await removeFavorite(user.userId, body.listingId);

        if (success) {
            return new Response(JSON.stringify({status: "success"}), { status: 200 });
        } else {
            return new Response("Internal Server Error", { status: 500 });
        }
    } catch (error) { 
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}