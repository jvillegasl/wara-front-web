import { Employee } from "@/types";
import { useMemo, useState } from "react";

export function useFilteredEmployees(employees: Employee[]) {
    const [filterParams, setFilterParams] = useState<any>({});

    const filteredEmployees = useMemo<Employee[]>(() => {
        return filterEmployees(employees, filterParams);
    }, [employees, filterParams]);

    function filterEmployees(
        employees: Employee[],
        filterParams: Record<keyof Employee, any>
    ) {
        if (filterParams.id !== "" && filterParams.id !== undefined) {
            const matchEmployee = employees.find(
                (employee) => employee.id === filterParams.id
            );

            if (!matchEmployee) return [];

            return [matchEmployee];
        }

        let filteredEmployees = [...employees];

        const filterOptions: (keyof Employee)[] = [
            "age",
            "department",
            "position",
        ];

        filterOptions.forEach((filterOption) => {
            const filterParam = filterParams[filterOption];

            if (!filterParam) return;

            filteredEmployees = filteredEmployees.filter((employee) => {
                return employee[filterOption] === filterParams[filterOption];
            });
        });
        return filteredEmployees;
    }

    return [filteredEmployees, setFilterParams] as const;
}
