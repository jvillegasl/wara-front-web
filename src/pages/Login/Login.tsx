import { login } from "@/api";
import "./Login.scss";

import { FormEvent, ReactNode, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Form,
    Card,
    Spinner,
    Modal,
    Row,
    Alert,
    CloseButton,
} from "react-bootstrap";

type AlertLoginProps = {
    children: ReactNode;
};

export function Login() {
    const navigate = useNavigate();

    const [isValidated, setIsValidated] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showError, setShowError] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = event?.target as HTMLFormElement;

        if (!form) return;

        if (form.checkValidity() === true) {
            const email = emailRef.current!.value;
            const password = passwordRef.current!.value;

            setShowSpinner(true);

            login(email, password)
                .then(({ accessToken }) => {
                    console.log(accessToken);
                    localStorage.setItem("accessToken", accessToken);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    setShowError(true);
                })
                .finally(() => {
                    setIsValidated(false);
                    setShowSpinner(false);
                });
        }

        setIsValidated(true);
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Card
                className="w-100"
                style={{ height: "fit-content", maxWidth: "480px" }}
            >
                <Card.Body>
                    <Form
                        noValidate
                        validated={isValidated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                ref={emailRef}
                                type="email"
                                placeholder="Enter email"
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                ref={passwordRef}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <Row xs="auto" className="g-0 gap-3">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={showSpinner}
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

            <Modal show={showError} dialogAs={AlertLogin} backdrop={false}>
                <CloseButton onClick={() => setShowError(false)} />
            </Modal>
        </div>
    );
}

function AlertLogin({ children }: AlertLoginProps) {
    return (
        <Alert className="alert-dismissible my-3 mx-5" variant={"danger"}>
            {children}
            <span className="fw-bold">Error: </span>Logging Failed
        </Alert>
    );
}
