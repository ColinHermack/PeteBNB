export async function getUserByToken(token: string) {
    const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    });

    const responseJson = await response.json();
    return responseJson.body;
}