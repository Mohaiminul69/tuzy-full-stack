import React, { useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import AlertModal from "../modals/alert-modal";
import ConfirmModal from "../modals/confirm-modal";
import DeleteCard from "./delete-card";
import "./delete-page.css";

const DeletePage = ({
  getCollectionCallback,
  deleteCallBack,
  title,
  type,
  confirmTitle,
  alertText,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: entities = [], isFetching } = getCollectionCallback();
  const [deleteEntity] = deleteCallBack();

  const handleConfirmModal = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const handleOrderDelete = (id) => {
    setShowConfirmModal(false);
    deleteEntity(id)
      .unwrap()
      .then(() => setShowAlert(true));
  };

  if (isFetching) {
    return (
      <div className="bg-my-bookings py-5">
        <h1 className="display-2 my-5">{title}</h1>
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-my-bookings py-5">
      <h1 className="display-2 my-5">{title}</h1>
      <Container>
        {entities.length === 0 ? (
          <h1 className="fw-light">We dont have any tours at the moment.</h1>
        ) : (
          <Row>
            {entities.map((entity) => (
              <DeleteCard
                key={entity.id}
                location={entity}
                type={type}
                handleConfirmModal={handleConfirmModal}
              />
            ))}
          </Row>
        )}
      </Container>
      <ConfirmModal
        handleOrderDelete={handleOrderDelete}
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        entityId={selectedId}
        confirmTitle={confirmTitle}
      />
      <AlertModal
        showAlert={showAlert}
        closeAlert={() => setShowAlert(false)}
        alertText={alertText}
      />
    </div>
  );
};

export default DeletePage;
