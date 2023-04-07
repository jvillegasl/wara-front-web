import { newEmployee } from "@/apis";
import { useAlert } from "@/hooks";
import { Employee } from "@/types";
import { ComponentProps, FormEvent, useMemo, useState } from "react";
import { Button, Card, Form, Row, Spinner } from "react-bootstrap";
import { FaChevronLeft as ChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type BsFormControlProps = ComponentProps<typeof Form.Group>;

type EmployeeFormInput = {
    label: string;
    name: string;
    type: string;
    placeholder: string;
} & Partial<BsFormControlProps>;

export function New() {
    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false);
    const [showAlert, setAlertConfig, renderAlert] = useAlert();

    const employeeFormItems = useMemo<EmployeeFormInput[]>(
        () => [
            {
                label: "ID (8 characters)",
                type: "text",
                name: "id",
                placeholder: "Enter ID",
                pattern: "^[a-zA-Z0-9]{8}$",
            },
            {
                label: "First Name",
                type: "text",
                name: "firstname",
                placeholder: "Enter first name",
            },
            {
                label: "Last Name",
                type: "text",
                name: "lastname",
                placeholder: "Enter last name",
            },
            {
                label: "Age",
                type: "number",
                name: "age",
                placeholder: "Enter age",
            },
            {
                label: "Department",
                type: "text",
                name: "department",
                placeholder: "Enter department",
            },
            {
                label: "Position",
                type: "text",
                name: "position",
                placeholder: "Enter position",
            },
        ],
        []
    );

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        if (form.checkValidity() !== true) return;

        let employee = {} as Employee;

        employeeFormItems.forEach((item) => {
            let value = form[item.name].value;

            if (item.type === "number") value = parseInt(value);

            employee = { ...employee, [item.name]: value };
        });

        setShowSpinner(true);

        newEmployee(employee)
            .then(() =>
                setAlertConfig({
                    message: "Employee successfully created",
                    status: "Success",
                    variant: "success",
                })
            )
            .catch(({ message }) =>
                setAlertConfig({
                    message,
                    status: "Error",
                    variant: "danger",
                })
            )
            .finally(() => {
                setShowSpinner(false);
                showAlert();
            });
    }

    function renderFormItems() {
        return employeeFormItems.map(({ label, ...inputProps }, i) => {
            return (
                <Form.Group key={i} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control {...inputProps} required></Form.Control>
                </Form.Group>
            );
        });
    }

    return (
        <main>
            <h1>New Employee</h1>

            <hr />
            <Button
                className="p-2 d-flex align-items-center justify-content-center"
                variant="outline-primary"
                onClick={() => navigate("../")}
            >
                <ChevronLeft />
            </Button>
            <hr />

            <br />

            <div className="d-flex justify-content-center align-items-center">
                <Card
                    className="w-100"
                    style={{ height: "fit-content", maxWidth: "560px" }}
                >
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            {renderFormItems()}

                            <Row xs="auto" className="g-0 gap-3">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    // disabled={showSpinner}
                                >
                                    Submit
                                </Button>

                                {showSpinner && (
                                    <div className="d-flex align-items-center">
                                        <Spinner variant="primary" />
                                    </div>
                                )}
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            {renderAlert()}
        </main>
    );
}
