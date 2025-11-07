import { getUserByToken } from '@/data/users';
import { getFavorites } from '@/data/favorites';

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

        const favorites = await getFavorites(user.userId);
        return new Response(JSON.stringify(favorites), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}