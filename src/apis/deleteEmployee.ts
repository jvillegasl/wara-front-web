import { getToken } from "@/utils";
import axios, { AxiosError } from "axios";

type DeleteEmployeeResponse = {
    message: string;
    body: {
        id: string;
    };
};

type DeleteEmployeeError = {
    message: string;
};

export async function deleteEmployee(id: string) {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const URL = `api/employee/delete/${id}`;
    const token = getToken();

    const deleteRequest = axios.delete<DeleteEmployeeResponse>(URL, {
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    try {
        const response = await deleteRequest;
        const data = await response.data;
        return data.body.id;
    } catch (error) {
        const err = error as AxiosError<DeleteEmployeeError>;
        throw new Error(err.response?.data.message);
    }
}

function mockedDeleteEmployee(id: string) {
    const randomTimeout = Math.floor(Math.random() * 2000) + 1000;

    return new Promise<string>((resolve, reject) => {
        const randomNum = Math.random();

        setTimeout(() => {
            if (randomNum < 0.1) {
                reject(new Error("Delete employee failed"));
            }

            resolve(id);
        }, randomTimeout);
    });
}
