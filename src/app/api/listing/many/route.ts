import { getUserByToken } from '@/data/users';

export default async function GET(request: Request) {
    const token = request.headers.get('authorization');
    if (token === null) {
        return new Response("No credentials provided", { status: 401 });
    }

    const user = await getUserByToken(token.trim());
    if (user.userId === '') {
        return new Response("Invalid token", { status: 401 });
    }

    const urlParams = new URLSearchParams(request.url.split("?")[1]);

    
}