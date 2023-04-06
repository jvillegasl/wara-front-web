import { Employee } from "@/types";
import { Button, Modal } from "react-bootstrap";

type DeleteEmployeeModalProps = {
    employee: Employee;
    show: boolean;
    onHide: () => void;
    onDelete: (id: string) => void;
};

export function DeleteEmployeeModal({
    employee,
    show,
    onHide,
    onDelete,
}: DeleteEmployeeModalProps) {
    function handleDeleteClick() {
        onDelete(employee.id);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Employee</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure you want to delete this employee?
                <br />
                <br />
                <strong>ID: {employee.id}</strong>
                <br />
                <strong>
                    Name: {employee.lastname + ", " + employee.firstname}
                </strong>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    Close
                </Button>

                <Button variant="danger" onClick={handleDeleteClick}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
