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
