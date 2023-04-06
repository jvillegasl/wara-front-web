import "./Home.scss";

import { ReactNode, useMemo, useState } from "react";
import { EmployeesTable } from "./EmployeeTable";
import { EditEmployeeModal } from "./EditEmployeeModal";
import { useEmployees } from "./useEmployees";
import { DeleteEmployeeModal } from "./DeleteEmployeeModal";
import { FilterEmpoyeesModal } from "./FilterEmployeesModal";
import { Alert, Button, CloseButton, Modal, Spinner } from "react-bootstrap";
import { FaFilter as Filter } from "react-icons/fa";
import { useFilteredEmployees } from "./useFilteredEmployees";
import { Employee } from "@/types";

type AlertEmployeeProps = {
    children: ReactNode;
    message: string;
};

export function Home() {
    const [employees, onUpdate, onDelete, isLoading, fetchError] =
        useEmployees();
    const [filteredEmployees, setFilterParams] =
        useFilteredEmployees(employees);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const selectedEmployee = useMemo(
        () =>
            filteredEmployees.find(
                (filteredEmployee) => filteredEmployee.id === selectedEmployeeId
            ),
        [filteredEmployees, selectedEmployeeId]
    );

    function handleEditClick(id: string) {
        setSelectedEmployeeId(id);
        setShowEditModal(true);
    }

    function handleDeleteClick(id: string) {
        setSelectedEmployeeId(id);
        setShowDeleteModal(true);
    }

    function handleEditModalHide() {
        setShowEditModal(false);
        setSelectedEmployeeId("");
    }

    function handleDeleteModalHide() {
        setShowDeleteModal(false);
        setSelectedEmployeeId("");
    }

    function handleFilterEmployees(filterParams: Record<string, any>) {
        setFilterParams(filterParams);
        setShowFilterModal(false);
    }

    function handleUpdateEmployee(editedEmployee: Employee) {
        onUpdate(editedEmployee).catch(({ message }) => {
            setAlertMessage(message);
            setShowAlert(true);
        });
    }

    function handleDeleteEmployee(id: string) {
        onDelete(id).catch(({ message }) => {
            setAlertMessage(message);
            setShowAlert(true);
        });
    }

    function renderTable() {
        if (isLoading === true) return <Spinner variant="primary" />;

        if (fetchError !== undefined) {
            return <strong className="text-danger">{fetchError}</strong>;
        }

        return (
            <>
                <Button
                    variant="outline-primary"
                    onClick={() => setShowFilterModal(true)}
                >
                    <Filter />
                </Button>

                <hr />

                <EmployeesTable
                    employees={filteredEmployees}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            </>
        );
    }

    return (
        <main>
            <h1>Dashboard</h1>

            <hr />

            {renderTable()}

            {selectedEmployee !== undefined && (
                <>
                    <EditEmployeeModal
                        employee={selectedEmployee}
                        show={showEditModal}
                        onHide={handleEditModalHide}
                        onUpdate={handleUpdateEmployee}
                    />
                    <DeleteEmployeeModal
                        employee={selectedEmployee}
                        show={showDeleteModal}
                        onHide={handleDeleteModalHide}
                        onDelete={handleDeleteEmployee}
                    />
                </>
            )}

            <FilterEmpoyeesModal
                employees={employees}
                show={showFilterModal}
                onHide={() => setShowFilterModal(false)}
                onFilter={handleFilterEmployees}
            />

            <Modal
                className="pe-none"
                show={showAlert}
                dialogAs={() => (
                    <AlertEmployee
                        children={
                            <CloseButton onClick={() => setShowAlert(false)} />
                        }
                        message={alertMessage}
                    />
                )}
                backdrop={false}
                autoFocus={false}
                enforceFocus={false}
                scrollable={true}
                onHide={() => setShowAlert(false)}
            />
        </main>
    );
}

function AlertEmployee({ children, message }: AlertEmployeeProps) {
    return (
        <Alert
            className="pe-auto alert-dismissible my-3 mx-5"
            variant={"danger"}
        >
            <span className="fw-bold">Error: </span>
            {message}
            {children}
        </Alert>
    );
}
