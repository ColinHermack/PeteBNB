import { deleteListing, getListing } from '@/data/listings';
import { getUserByToken } from '@/data/users';

export async function DELETE(request: Request) {
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

        if (body === null || body.id === null) {
            return new Response("No listing id provided", { status: 400 });
        }

        const id = body.id.toString();

        const listing = await getListing(id);

        if (listing?.lister.username !== user.username) {
            return new Response("Unauthorized", { status: 401 });
        }

        const success = await deleteListing(id);

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