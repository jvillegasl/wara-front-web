import { Employee } from "@/types";
import { getToken } from "@/utils";
import { deleteToken } from "@/utils/deleteToken";
import axios, { AxiosError } from "axios";

type NewEmployeeResponse = {
    message: string;
    body: Employee;
};

type NewEmployeeError = {
    message: string;
};

export async function newEmployee(employee: Employee) {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const URL = "api/employee/new";
    const token = getToken();

    const newEmployeeRequest = axios.post<NewEmployeeResponse>(
        URL,
        { ...employee },
        {
            baseURL: BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );

    try {
        const response = await newEmployeeRequest;
        const data = await response.data;
        return data.body;
    } catch (error) {
        const err = error as AxiosError<NewEmployeeError>;

        if (err.response?.status === 401) {
            deleteToken();
            window.location.reload();
        }

        throw new Error(err.response?.data.message);
    }
}
