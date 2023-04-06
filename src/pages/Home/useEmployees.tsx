import { deleteEmployee, fetchEmployees, updateEmployee } from "@/apis";
import { Employee } from "@/types";
import { useEffect, useState } from "react";

export function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | undefined>();

    useEffect(() => {
        setIsLoading(true);
        setFetchError(undefined);

        fetchEmployees()
            .then((data) => setEmployees(data))
            .catch(({ message }) => setFetchError(message))
            .finally(() => setIsLoading(false));
    }, []);

    async function onUpdate(editedEmployee: Employee) {
        return updateEmployee(editedEmployee).then((updatedEmployee) => {
            setEmployees((prevEmployees) => {
                const newEmployess = prevEmployees.map((employee) => {
                    if (employee.id === updatedEmployee.id) {
                        return { ...employee, ...updatedEmployee };
                    }

                    return employee;
                });

                return newEmployess;
            });
        });
    }

    async function onDelete(id: string) {
        return deleteEmployee(id).then((employeeId) => {
            setEmployees((prevEmployees) => {
                return prevEmployees.filter(
                    (employee) => employee.id !== employeeId
                );
            });
        });
    }

    return [employees, onUpdate, onDelete, isLoading, fetchError] as const;
}
