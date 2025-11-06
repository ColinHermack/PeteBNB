import { getUserByToken } from '@/data/users';
import { addNewListing } from '@/data/listings';

export async function POST(request: Request) {
    try {
        const token = request.headers.get('authorization');
        console.log(token);
        if (token === null) {
            return (new Response("No credentials provided", { status: 401 }));
        }
        const user = await getUserByToken(token.trim());

        if (user.userId === '') {
            return (new Response("Invalid token", { status: 401 }));
        }

        const body = await request.json();

        const id = await addNewListing(
            user.userId,
            body.address,
            body.title,
            body.type,
            body.bedrooms,
            body.description,
            body.cost,
            body.startDate,
            body.endDate
        );

        return (new Response(JSON.stringify({id: id}), { status: 200 }));
    } catch (error) {
        console.error(error);
        return (new Response("Internal Server Error", { status: 500 }));
    }
    

}