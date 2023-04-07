import { Employee } from "@/types";

export function employeesToSQL(employees: Employee[]) {
    const values = employees
        .map(
            ({ id, firstname, lastname, age, department, position }) =>
                // Formatear los valores en una cadena de texto SQL
                `('${id}', '${firstname}', '${lastname}', ${age}, '${department}', '${position}', now(), now())`
        )
        .join(",\n");

    return `INSERT INTO employees (id, firstname, lastname, age, department, position, created_at, updated_at) VALUES
${values};`;
}
