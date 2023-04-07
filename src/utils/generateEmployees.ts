export function generateEmployees(n: number) {
    const firstNames = [
        "Emma",
        "Olivia",
        "Ava",
        "Isabella",
        "Sophia",
        "Mia",
        "Charlotte",
        "Amelia",
        "Harper",
        "Evelyn",
    ];
    const lastNames = [
        "Smith",
        "Johnson",
        "Brown",
        "Taylor",
        "Miller",
        "Anderson",
        "Wilson",
        "Moore",
        "Jackson",
        "Martin",
    ];
    const positions = [
        "Manager",
        "Assistant Manager",
        "Supervisor",
        "Team Leader",
        "Senior Engineer",
        "Junior Engineer",
        "Developer",
        "Designer",
        "Analyst",
        "Consultant",
    ];
    const departments = [
        "Sales",
        "Marketing",
        "Engineering",
        "Human Resources",
        "Finance",
        "Legal",
        "IT",
        "Customer Service",
        "Operations",
        "Research and Development",
    ];

    const employees = [];

    for (let i = 0; i < n; i++) {
        const firstName1 =
            firstNames[Math.floor(Math.random() * firstNames.length)];
        const firstName2 =
            firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName1 =
            lastNames[Math.floor(Math.random() * lastNames.length)];
        const lastName2 =
            lastNames[Math.floor(Math.random() * lastNames.length)];
        const position =
            positions[Math.floor(Math.random() * positions.length)];
        const department =
            departments[Math.floor(Math.random() * departments.length)];
        const id = i.toString().padStart(8, "0");

        const employee = {
            firstname: `${firstName1} ${firstName2}`,
            lastname: `${lastName1} ${lastName2}`,
            age: Math.floor(Math.random() * 50) + 18,
            position: position,
            department: department,
            id: id,
        };

        employees.push(employee);
    }

    return employees;
}
