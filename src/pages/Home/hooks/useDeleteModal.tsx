import { Employee } from "@/types";
import { useState } from "react";
import { DeleteEmployeeModal } from "../components";

export function useDeleteModal(
    onDelete: (id: string) => void,
    selectedEmployee: Employee | undefined
) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function handleEditModalHide() {
        setShowDeleteModal(false);
    }

    function renderDeleteModal() {
        return (
            selectedEmployee !== undefined && (
                <>
                    <DeleteEmployeeModal
                        employee={selectedEmployee}
                        show={showDeleteModal}
                        onHide={handleEditModalHide}
                        onDelete={onDelete}
                    />
                </>
            )
        );
    }

    return [() => setShowDeleteModal(true), renderDeleteModal] as const;
}
