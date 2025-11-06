import { getUserByToken } from '@/data/users';
import { getListing } from '@/data/listings';

export default async function GET(request: Request) {
    try {
        const urlParams = new URLSearchParams(request.url.split("?")[1]);

        const token = request.headers.get('authorization');
        if (token === null) {
            return new Response("No credentials provided", { status: 401 });
        }

        const user = await getUserByToken(token.trim());

        if (user.userId === '') {
            return new Response("Invalid token", { status: 401 });
        }

        const id = urlParams.get('id');

        if (id === null) {
            return new Response("No listing id provided", { status: 400 });
        }

        const listing = await getListing(id);

        if (listing === null) {
            return new Response("Listing not found", { status: 404 });
        }

        return new Response(JSON.stringify(listing), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}