import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DeleteCard = ({ location, type, handleConfirmModal }) => {
  const { img_src, short_description, status, name, id } = location;

  return (
    <Col sm={12} md={6} lg={4} className="mb-3">
      <div className="booking-view">
        <img src={img_src} alt="" />
        <h4 className="fw-light mt-3">{name}</h4>
        <p>
          Booking Status:{" "}
          {status === false ? (
            <span className="text-warning">Pending</span>
          ) : (
            <span className="text-success">Approved</span>
          )}
        </p>
        <p>{short_description}</p>
        <div className="d-flex gap-2">
          <Link to={`/${type}/details/${id}`}>
            <button className="btn btn-danger btn-sm !font-bold !text-black !bg-amber-400 hover:!bg-amber-300 !px-2 !border-gray-900">
              View Details
            </button>
          </Link>
          <button
            onClick={() => handleConfirmModal(location.id)}
            className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize"
          >
            {type === "booking" ? "Cancel Booking" : "Delete"}
          </button>
        </div>
      </div>
    </Col>
  );
};

export default DeleteCard;
