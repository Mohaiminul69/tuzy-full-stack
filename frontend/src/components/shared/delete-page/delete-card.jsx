import React from "react";
import { Col } from "react-bootstrap";
import getStatusColor from "../../../utils/status-color";
import { Link } from "react-router-dom";

const DeleteCard = ({
  location,
  type,
  handleConfirmModal,
  status,
  bookingId,
}) => {
  const { img_src, short_description, name, id } = location;
  const isBooking = type === "booking";
  const isGalleryImage = type === "gallary-image";
  const cancelOrDeleteIcon = isBooking ? "skull mr-1" : "trash";
  const entityId = isBooking ? bookingId : id;

  return (
    <Col sm={12} md={6} lg={4} className="mb-3">
      <div className="booking-view">
        <img src={img_src} alt="" />
        <h4 className="fw-light mt-3">{name}</h4>
        {isBooking && (
          <p>
            Booking Status:{" "}
            <span className={`capitalize ${getStatusColor(status)}`}>
              {status}
            </span>
          </p>
        )}
        <p>{short_description}</p>
        <div className="d-flex justify-between">
          {!isGalleryImage && (
            <Link to={`/${type}/details/${id}`}>
              <button className="btn btn-danger btn-sm !font-bold !text-black !bg-amber-400 hover:!bg-amber-300 !px-2 !border-gray-900">
                <i className="fas fa-eye mr-1"></i>
                View Details
              </button>
            </Link>
          )}
          <div className="flex gap-2">
            {!isBooking && (
              <Link to={`/${type}/edit/${id}`}>
                <button className="btn btn-danger btn-sm !font-bold !text !bg-cyan-700 hover:!bg-cyan-800 !px-2 !border-gray-900">
                  <i className="fas fa-edit"></i>
                </button>
              </Link>
            )}
            <button
              onClick={() => handleConfirmModal(entityId)}
              className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize"
            >
              <i className={`fas fa-${cancelOrDeleteIcon}`}></i>
              {isBooking && "Cancel Booking"}
            </button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default DeleteCard;
