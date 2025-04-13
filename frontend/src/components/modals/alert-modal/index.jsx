import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAlert = ({ showAlert, closeAlert, alertText }) => {
  return (
    <Modal show={showAlert} onHide={closeAlert} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">
          {alertText} Successfully
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{alertText}</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={closeAlert}>
          Okay!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlert;
