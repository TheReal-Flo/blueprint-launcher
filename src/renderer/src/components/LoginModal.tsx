import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoginModal() {
    const requestAuth = (): void => window.electron.ipcRenderer.send("requestAuth")

    const [showModal, setShowModal] = useState(false);

    window.electron.ipcRenderer.on('loginRequired', () => {
        setShowModal(true);
    });

    window.electron.ipcRenderer.on('profileInfo', () => {
        setShowModal(false);
    });

    return (
        <Modal
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    You are not logged in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You need to log in with your Microsoft account in order to play Minecraft with the Blueprint Launcher.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={requestAuth}>Log in</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;