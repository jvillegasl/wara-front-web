import { getToken } from "./getToken";

export function isAuthenticated() {
    const token = getToken();

    return !!token;
}
