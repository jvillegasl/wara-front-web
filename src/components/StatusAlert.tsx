import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

export type AlertConfig = {
    status: string;
    message: string;
    variant: string;
};

type StatusAlertProps = {
    children: ReactNode;
    config: AlertConfig;
};

export function StatusAlert({ children, config }: StatusAlertProps) {
    return (
        <Alert
            className="pe-auto alert-dismissible my-3 mx-5"
            variant={config.variant}
        >
            <span className="fw-bold">{config.status}: </span>
            {config.message}
            {children}
        </Alert>
    );
}
