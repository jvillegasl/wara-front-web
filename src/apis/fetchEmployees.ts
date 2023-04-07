import { EMPLOYEES } from "@/data";
import { Employee } from "@/types";
import { getToken } from "@/utils";
import { deleteToken } from "@/utils/deleteToken";
import axios, { AxiosError } from "axios";

type FetchEmployeesResponse = {
    body: Employee[];
};

export async function fetchEmployees(): Promise<Employee[]> {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const URL = "api/employee/all";
    const token = getToken();

    const fetchRequest = axios.get<FetchEmployeesResponse>(URL, {
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    try {
        const response = await fetchRequest;
        const data = await response.data;
        return data.body;
    } catch (error) {
        const err = error as AxiosError;

        if (err.response?.status === 401) {
            deleteToken();
            window.location.reload();
        }

        throw new Error(err.message);
    }
}

function mockedFetchEmployees(): Promise<Employee[]> {
    const randomTimeout = Math.floor(Math.random() * 2000) + 1000;

    return new Promise<Employee[]>((resolve, reject) => {
        const randomNum = Math.random();

        setTimeout(() => {
            if (randomNum < 0.1) {
                reject(new Error("Fetch employees failed"));
            }

            resolve(EMPLOYEES);
        }, randomTimeout);
    });
}
