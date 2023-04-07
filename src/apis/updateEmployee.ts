import { Employee } from "@/types";
import { getToken } from "@/utils";
import axios, { AxiosError } from "axios";

type UpdateEmployeeResponse = {
    message: string;
    body: Employee;
};

type UpdateEmployeeError = {
    message: string;
    body?: Record<string, string>;
};

export async function updateEmployee(employee: Employee) {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const URL = `api/employee/update/${employee.id}`;
    const token = getToken();

    const { id, ...employeeWithoutId } = employee;

    const deleteRequest = axios.patch<UpdateEmployeeResponse>(
        URL,
        { ...employeeWithoutId },
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
        const response = await deleteRequest;
        const data = await response.data;
        return data.body;
    } catch (error) {
        const err = error as AxiosError<UpdateEmployeeError>;
        throw new Error(err.response?.data.message);
    }
}
