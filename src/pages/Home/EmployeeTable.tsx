import { Employee } from "@/types";
import { Button, Table } from "react-bootstrap";
import { FaPencilAlt as Edit, FaTrashAlt as Delete } from "react-icons/fa";

type EmployeesTableProps = {
    employees: Employee[];
    onEditClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
};

export function EmployeesTable({
    employees,
    onEditClick,
    onDeleteClick,
}: EmployeesTableProps) {
    function handleEditClick(id: string) {
        return () => onEditClick(id);
    }

    function handleDeleteClick(id: string) {
        return () => onDeleteClick(id);
    }

    function renderRows() {
        return employees.map((employee, i) => {
            return (
                <tr key={i}>
                    <td>{employee.id}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.age}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>
                        <div className="d-flex flex-wrap align-items-center gap-2">
                            <Button
                                className="p-2 d-inline-flex align-items-center"
                                variant="outline-primary"
                                onClick={handleEditClick(employee.id)}
                            >
                                <Edit />
                            </Button>
                            <Button
                                className="p-2 d-inline-flex align-items-center"
                                variant="outline-danger"
                                onClick={handleDeleteClick(employee.id)}
                            >
                                <Delete />
                            </Button>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Options</th>
                </tr>
            </thead>

            <tbody>{renderRows()}</tbody>
        </Table>
    );
}
