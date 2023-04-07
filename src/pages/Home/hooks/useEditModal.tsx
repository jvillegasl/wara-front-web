import { Employee } from "@/types";
import { useState } from "react";
import { EditEmployeeModal } from "../components";

export function useEditModal(
    onEdit: (editedEmployee: Employee) => void,
    selectedEmployee: Employee | undefined
) {
    const [showEditModal, setShowEditModal] = useState(false);

    function handleEditModalHide() {
        setShowEditModal(false);
    }

    function renderEditModal() {
        return (
            selectedEmployee !== undefined && (
                <>
                    <EditEmployeeModal
                        employee={selectedEmployee}
                        show={showEditModal}
                        onHide={handleEditModalHide}
                        onUpdate={onEdit}
                    />
                </>
            )
        );
    }

    return [() => setShowEditModal(true), renderEditModal] as const;
}
