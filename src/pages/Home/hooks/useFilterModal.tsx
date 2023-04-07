import { Employee } from "@/types";
import { useState } from "react";
import { FilterEmpoyeesModal } from "../components";

export function useFilterModal(
    employees: Employee[],
    onFilter: (filterParams: Record<string, any>) => void
) {
    const [showFilterModal, setShowFilterModal] = useState(false);

    function handleFilterEmployees(filterParams: Record<string, any>) {
        onFilter(filterParams);
        setShowFilterModal(false);
    }

    function renderFilterModal() {
        return (
            <FilterEmpoyeesModal
                employees={employees}
                show={showFilterModal}
                onHide={() => setShowFilterModal(false)}
                onFilter={handleFilterEmployees}
            />
        );
    }

    return [() => setShowFilterModal(true), renderFilterModal] as const;
}
