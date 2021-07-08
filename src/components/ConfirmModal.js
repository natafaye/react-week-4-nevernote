import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ConfirmModal({ isOpen, toggleDisplay, message, confirmButtonLabel, onConfirm }) {

    const handleConfirmClick = () => {
        onConfirm();
        toggleDisplay();
    }

    return (
        <Modal show={isOpen} onHide={toggleDisplay}>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleDisplay}> Cancel </Button>
                <Button variant="danger" onClick={ handleConfirmClick }>{ confirmButtonLabel }</Button>
            </Modal.Footer>
        </Modal>
    )
}
