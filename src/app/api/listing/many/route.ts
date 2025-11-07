import { getUserByToken } from '@/data/users';
import { getManyListings } from '@/data/listings';
import { url } from 'inspector';

export async function GET(request: Request) {
    const token = request.headers.get('authorization');

    if (token === null) {
        return new Response("No credentials provided", { status: 401 });
    }

    const user = await getUserByToken(token.trim());
    if (user.userId === '') {
        return new Response("Invalid token", { status: 401 });
    }

    const urlParams = new URLSearchParams(request.url.split("?")[1]);

    let maxPrice: number | string | null = urlParams.get('maxPrice');
    let numBedrooms: number | string | null = urlParams.get('numBedrooms');
    let type: string | null = urlParams.get('type');

    if (typeof maxPrice === 'string') {
        maxPrice = parseInt(maxPrice);
    }
    if (typeof numBedrooms === 'string') {
        numBedrooms = parseInt(numBedrooms);
    }

    const listings = await getManyListings(maxPrice, numBedrooms, type);

    return new Response(JSON.stringify(listings), { status: 200 });
}