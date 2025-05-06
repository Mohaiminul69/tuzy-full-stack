import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = (props) => {
  const { handleOrderDelete, show, handleClose, entityId, confirmTitle } =
    props;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <i className="fas fa-skull mr-2"></i>
          {confirmTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to proceed?</Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/90 !px-2 !border-gray-900 !capitalize"
          onClick={() => handleOrderDelete(entityId)}
        >
          Confirm
        </Button>
        <Button
          className="btn btn-danger btn-sm !font-bold !bg-gray-800 hover:!bg-gray-700 !px-2 !border-gray-900 !capitalize"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
