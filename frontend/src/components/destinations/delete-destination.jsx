import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmModal from "../shared/modals/confirm-modal";
import AlertModal from "../shared/modals/alert-modal";
import {
  useDeleteDestinationMutation,
  useGetDestinationsQuery,
} from "../../api/destinations";
import "./destination.css";

const DeleteDestination = () => {
  // Alert Modal
  // Alert Modal
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const handleAlert = () => setShowAlert(true);
  // Confirmation Modal
  // Confirmation Modal
  // Confirmation Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*
<---------------------------- Gettng All Tours From Database ---------------------------->
*/
  const { data: destinations = [], isFetching } = useGetDestinationsQuery();
  /*
<---------------------------- Deleting Tour from database ---------------------------->
*/

  const [deleteDestination] = useDeleteDestinationMutation();
  const handleOrderDelete = (id) => {
    handleClose();
    deleteDestination(id)
      .unwrap()
      .then(() => {
        setAlertText("Tour Deleted");
        handleAlert();
      });
  };
  /*
<---------------------------- Sending Id to Modal ---------------------------->
*/
  const sendIdToModal = () => {
    handleShow();
  };

  if (isFetching) {
    return (
      <div className="bg-my-orders py-5">
        <h1 className="display-2 my-5">All Tours</h1>
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-my-orders py-5">
      <h1 className="display-2 my-5">All Tours</h1>
      <Container>
        {destinations.length === 0 ? (
          <h1 className="fw-light">We dont have any tours at the moment.</h1>
        ) : (
          <Row>
            {destinations.map((destination) => (
              <Col key={destination.id} sm={12} md={6} lg={4} className="mb-3">
                <div className="order-view">
                  <img src={destination.img_src} alt="" />
                  <h4 className="fw-light mt-3">{destination.name}</h4>
                  <div className="d-flex justify-content-between">
                    <Link to={`/details/${destination.id}`}>
                      <button className="btn btn-dark">View Details</button>
                    </Link>
                    <button
                      onClick={() => sendIdToModal(destination._id)}
                      className="btn btn-danger"
                    >
                      Delete Tour
                    </button>
                  </div>
                  <ConfirmModal
                    handleOrderDelete={handleOrderDelete}
                    show={show}
                    handleClose={handleClose}
                    orderId={destination.id}
                  />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <AlertModal
        showAlert={showAlert}
        closeAlert={closeAlert}
        alertText={alertText}
      />
    </div>
  );
};

export default DeleteDestination;
