import { useMemo, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaFilter as Filter, FaPlus as New } from "react-icons/fa";
import { Employee } from "@/types";
import {
    useDeleteModal,
    useEditModal,
    useEmployees,
    useFilterModal,
    useFilteredEmployees,
} from "./hooks";
import { EmployeesTable } from "./components";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/hooks";
import { deleteToken } from "@/utils/deleteToken";

export function Home() {
    const navigate = useNavigate();

    const [employees, onUpdate, onDelete, isLoading, fetchError] =
        useEmployees();
    const [filteredEmployees, setFilterParams] =
        useFilteredEmployees(employees);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

    const selectedEmployee = useMemo(
        () =>
            filteredEmployees.find(
                (filteredEmployee) => filteredEmployee.id === selectedEmployeeId
            ),
        [filteredEmployees, selectedEmployeeId]
    );

    const [showFilterModal, renderFilterModal] = useFilterModal(
        employees,
        setFilterParams
    );
    const [showEditModal, renderEditModal] = useEditModal(
        handleEditEmployee,
        selectedEmployee
    );
    const [showDeleteModal, renderDeleteModal] = useDeleteModal(
        handleDeleteEmployee,
        selectedEmployee
    );
    const [showAlert, setAlertConfig, renderAlert] = useAlert();

    function handleDeleteButtonClick(id: string) {
        setSelectedEmployeeId(id);
        showDeleteModal();
    }

    function handleEditButtonClick(id: string) {
        setSelectedEmployeeId(id);
        showEditModal();
    }

    function handleEditEmployee(editedEmployee: Employee) {
        onUpdate(editedEmployee)
            .then(() => {
                setAlertConfig({
                    status: "Success",
                    message: "Employee successfully updated",
                    variant: "success",
                });
            })
            .catch(({ message }) => {
                setAlertConfig({
                    status: "Error",
                    message,
                    variant: "danger",
                });
            })
            .finally(showAlert);
    }

    function handleDeleteEmployee(id: string) {
        onDelete(id)
            .then(() => {
                setAlertConfig({
                    status: "Success",
                    message: "Employee successfully deleted",
                    variant: "success",
                });
            })
            .catch(({ message }) => {
                setAlertConfig({
                    status: "Error",
                    message,
                    variant: "danger",
                });
            })
            .finally(showAlert);
    }

    function handleLogout() {
        deleteToken();
        location.reload();
    }

    function renderTable() {
        if (isLoading === true) return <Spinner variant="primary" />;

        if (fetchError !== undefined) {
            return <strong className="text-danger">{fetchError}</strong>;
        }

        return (
            <>
                <div className="d-flex gap-3">
                    <Button
                        className="p-2 d-flex align-items-center justify-content-center"
                        variant="outline-primary"
                        onClick={showFilterModal}
                    >
                        <Filter />
                    </Button>

                    <Button
                        className="p-2 d-flex align-items-center justify-content-center"
                        variant="success"
                        onClick={() => navigate("/new")}
                    >
                        <New />
                    </Button>
                </div>

                <hr />

                <EmployeesTable
                    employees={filteredEmployees}
                    onEditButtonClick={handleEditButtonClick}
                    onDeleteButtonClick={handleDeleteButtonClick}
                />
            </>
        );
    }

    return (
        <main>
            <div className="d-flex justify-content-between">
                <h1>Dashboard</h1>

                <Button variant="dark" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <hr />

            {renderTable()}
            {renderEditModal()}
            {renderDeleteModal()}
            {renderFilterModal()}
            {renderAlert()}
        </main>
    );
}
