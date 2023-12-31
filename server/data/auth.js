import { verify } from 'jsonwebtoken'

export async function getUserByRequest(event) {
    const cookies = parseCookies(event);
    const token = cookies['auth:token'];
    try {
        var user = await verify(token, useRuntimeConfig().secret);
        return user;
    } catch(e) {
        return null;
    }
}