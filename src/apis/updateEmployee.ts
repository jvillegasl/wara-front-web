import { Employee } from "@/types";

export function updateEmployee(employee: Employee) {
    const randomTimeout = Math.floor(Math.random() * 2000) + 1000;

    return new Promise<Employee>((resolve, reject) => {
        const randomNum = Math.random();

        setTimeout(() => {
            if (randomNum < 0.1) {
                reject(new Error("Update employee failed"));
            }

            resolve(employee);
        }, randomTimeout);
    });
}
