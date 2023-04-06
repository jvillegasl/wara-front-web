export function isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");

    console.log(accessToken)
    
    return !!accessToken;
}
