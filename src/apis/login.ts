import axios, { AxiosError } from "axios";

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const URL = "api/auth/login";

    const loginRequest = axios.post<LoginResponse>(
        URL,
        { email, password },
        {
            baseURL: BASE_URL,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );

    try {
        const response = await loginRequest;
        const data = await response.data;
        return data;
    } catch (error) {
        const err = error as AxiosError;
        throw new Error(err.message);
    }
}

function mockedLogin(
    email: string,
    password: string
): Promise<{ accessToken: string }> {
    const randomTimeout = Math.floor(Math.random() * 2000) + 1000;

    return new Promise((resolve, reject) => {
        const randomNum = Math.random();

        setTimeout(() => {
            if (randomNum < 0.5) {
                reject(new Error("Login failed"));
            }

            if (email !== "foo@example.com" || password !== "password") {
                reject(new Error("Invalid email or password"));
            }

            resolve({ accessToken: "mock-jwt" });
        }, randomTimeout);
    });
}
