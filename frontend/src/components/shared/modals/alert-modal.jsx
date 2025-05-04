import React from "react";
import { Modal, Button } from "react-bootstrap";

const AlertModal = ({ showAlert, closeAlert, alertText }) => {
  const capitalizedAlert =
    alertText.charAt(0).toUpperCase() + alertText.slice(1);

  return (
    <Modal show={showAlert} onHide={closeAlert} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">{capitalizedAlert}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{capitalizedAlert} successfully!</Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger btn-sm !font-bold !bg-gray-800 hover:!bg-gray-700 !px-2 !border-gray-900 !capitalize"
          onClick={closeAlert}
        >
          Okay!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
