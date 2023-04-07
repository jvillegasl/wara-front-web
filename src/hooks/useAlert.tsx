import { AlertConfig, StatusAlert } from "@/components";
import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";

export function useAlert() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState<AlertConfig>();

    function renderAlert() {
        return (
            alertConfig && (
                <Modal
                    className="pe-none"
                    show={showAlert}
                    dialogAs={() => (
                        <StatusAlert
                            children={
                                <CloseButton
                                    onClick={() => setShowAlert(false)}
                                />
                            }
                            config={alertConfig}
                        />
                    )}
                    backdrop={false}
                    autoFocus={false}
                    enforceFocus={false}
                    scrollable={true}
                    onHide={() => setShowAlert(false)}
                />
            )
        );
    }

    return [() => setShowAlert(true), setAlertConfig, renderAlert] as const;
}
