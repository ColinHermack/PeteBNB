import { getUserByToken } from "@/data/users";

export async function GET(request: Request) {
    if (request.url.split("?").length != 2) {
        return new Response("Bad Request", { status: 400 });
    }

    const token=request.url.split("?")[1].split("=")[1].toString();
    const user = await getUserByToken(token);

    if (user.userId === "") {
        return new Response("Invalid token", { status: 401 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}