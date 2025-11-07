import { getUserByToken } from '@/data/users';
import { getListingsByOwner } from '@/data/listings';

export async function GET(request: Request) {
    try {
        const token = request.headers.get('authorization');
        if (token === null) {
            return new Response("No credentials provided", { status: 401 });
        }

        const user = await getUserByToken(token.trim());
        if (user.userId === '') {
            return new Response("Invalid token", { status: 401 });
        }

        const listings = await getListingsByOwner(user.userId);
        return new Response(JSON.stringify(listings), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}