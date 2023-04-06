import { Employee } from "@/types";
import { FormEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type EditEmployeeModalProps = {
    employee: Employee;
    show: boolean;
    onHide: () => void;
    onUpdate: (editedEmployee: Employee) => void;
};

export function EditEmployeeModal({
    employee,
    show,
    onHide,
    onUpdate,
}: EditEmployeeModalProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        if (form.checkValidity() === false) return;

        let editedEmployee = { ...employee };

        for (const property in editedEmployee) {
            if (property === "id") continue;

            const newValue = form[property].value;

            editedEmployee = {
                ...editedEmployee,
                [property]: newValue,
            };
        }

        onUpdate(editedEmployee);
        onHide();
    }

    function renderFormItems() {
        const employeeFormItems = [
            {
                label: "First Name",
                type: "text",
                name: "firstname",
                placeholder: "Enter first name",
                defaultValue: employee.firstname,
            },
            {
                label: "Last Name",
                type: "text",
                name: "lastname",
                placeholder: "Enter last name",
                defaultValue: employee.lastname,
            },
            {
                label: "Age",
                type: "number",
                name: "age",
                placeholder: "Enter age",
                defaultValue: employee.age,
            },
            {
                label: "Department",
                type: "text",
                name: "department",
                placeholder: "Enter department",
                defaultValue: employee.department,
            },
            {
                label: "Position",
                type: "text",
                name: "position",
                placeholder: "Enter position",
                defaultValue: employee.position,
            },
        ];

        return employeeFormItems.map((item, i) => {
            return (
                <Form.Group key={i} className="mb-3">
                    <Form.Label>{item.label}</Form.Label>
                    <Form.Control
                        type={item.type}
                        placeholder={item.placeholder}
                        name={item.name}
                        defaultValue={item.defaultValue}
                        required
                    ></Form.Control>
                </Form.Group>
            );
        });
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="editEmployeeForm" onSubmit={handleSubmit}>
                    {renderFormItems()}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>

                <Button variant="primary" type="submit" form="editEmployeeForm">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
