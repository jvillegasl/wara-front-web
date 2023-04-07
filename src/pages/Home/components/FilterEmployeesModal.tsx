import { Employee } from "@/types";
import { generateKey, getUniqueValues } from "@/utils";
import { Button, Form, Modal } from "react-bootstrap";
import { FormEvent, useMemo } from "react";

type FilterEmployeesModalProps = {
    employees: Employee[];
    show: boolean;
    onHide: () => void;
    onFilter: (filterParams: Record<string, any>) => void;
};

export function FilterEmpoyeesModal({
    employees,
    show,
    onHide,
    onFilter,
}: FilterEmployeesModalProps) {
    const filterOptions = useMemo(
        () => ["id", "age", "department", "position"] as const,
        []
    );

    function handleSubmitFilter(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        let filterParams = {} as Record<typeof filterOptions[number], any>;

        filterOptions.forEach((filterOption) => {
            const inputType = form[filterOption].type;
            let inputValue = form[filterOption].value;

            if (inputType === "number") inputValue = parseInt(inputValue);

            filterParams[filterOption] = inputValue;
        });

        onFilter(filterParams);
    }

    function renderFormItems() {
        const positionOptions = getUniqueValues(employees, "position");
        const departmentOptions = getUniqueValues(employees, "department");
        const idOptions = getUniqueValues(employees, "id");

        const filterEmployeesItems = [];

        const ageInput = (
            <>
                <Form.Label>Age:</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter age"
                    name="age"
                ></Form.Control>
            </>
        );
        const departmentInput = (
            <>
                <Form.Label>Department:</Form.Label>
                <Form.Select name="department">
                    <option value="">Select department</option>
                    {departmentOptions.map((option, i) => {
                        return (
                            <option key={generateKey(i)} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </Form.Select>
            </>
        );
        const positionInput = (
            <>
                <Form.Label>Position:</Form.Label>
                <Form.Select name="position">
                    <option value="">Select position</option>
                    {positionOptions.map((option, i) => {
                        return (
                            <option key={generateKey(i)} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </Form.Select>
            </>
        );
        const idInput = (
            <>
                <Form.Label>ID:</Form.Label>
                <Form.Select name="id">
                    <option value="">Select ID</option>
                    {idOptions.map((option, i) => {
                        return (
                            <option key={generateKey(i)} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </Form.Select>
            </>
        );

        filterEmployeesItems.push(idInput);
        filterEmployeesItems.push(ageInput);
        filterEmployeesItems.push(departmentInput);
        filterEmployeesItems.push(positionInput);

        return filterEmployeesItems.map((item, i) => {
            return (
                <Form.Group key={generateKey(i)} className="mb-3">
                    {item}
                </Form.Group>
            );
        });
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Filter Employees</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="filterEmployeesForm" onSubmit={handleSubmitFilter}>
                    {renderFormItems()}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    form="filterEmployeesForm"
                >
                    Filter
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
