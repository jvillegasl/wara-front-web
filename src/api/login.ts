export function login(
    email: string,
    password: string
): Promise<{ accessToken: string }> {
    const randomTimeout = Math.floor(Math.random() * 2000) + 1000;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email !== "foo@example.com" || password !== "password") {
                reject(new Error("Invalid email or password"));
            }

            resolve({ accessToken: "mock-jwt" });
        }, randomTimeout);
    });
}
