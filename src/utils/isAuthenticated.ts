export function isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");

    return !!accessToken;
}
