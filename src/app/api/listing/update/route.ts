import { updateListing, getListing } from '@/data/listings';
import { getUserByToken } from '@/data/users';

export async function PUT(request: Request) {
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

        const currListing = await getListing(body.id);
        if (currListing === null) {
            return new Response("Listing not found", { status: 404 });
        }
        if (currListing.lister.username !== user.username) {
            return new Response("Unauthorized", { status: 401 });
        }

        const success = await updateListing(body.id, body.address, body.title, body.type, body.bedrooms, user.userId, body.description, body.cost, new Date(body.startDate), new Date(body.endDate));

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