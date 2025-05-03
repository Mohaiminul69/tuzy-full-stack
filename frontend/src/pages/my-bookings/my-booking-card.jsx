import React from "react";
import { useGetSinglePackageQuery } from "../../api/packages";
import { useGetSingleDestinationQuery } from "../../api/destinations";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyBookingCard = ({ booking }) => {
  const { package_id, destination_id } = booking;

  const locationId = package_id || destination_id;
  const callback = package_id
    ? useGetSinglePackageQuery
    : useGetSingleDestinationQuery;

  const { data: location } = callback(locationId);
  const { id, img_src, name, short_description } =
    location?.["package"] || location?.["destination"] || {};

  return (
    <Col sm={12} md={6} lg={4} className="mb-3">
      <div className="booking-view">
        <img src={img_src} alt="" />
        <h4 className="fw-light mt-3">{name}</h4>
        <p>
          Booking Status:{" "}
          {booking.status === false ? (
            <span className="text-warning">Pending</span>
          ) : (
            <span className="text-success">Approved</span>
          )}
        </p>
        <p>{short_description}</p>
        <div className="d-flex gap-2">
          <Link
            to={`/${
              location?.["package"] ? "package" : "destination"
            }/details/${id}`}
          >
            <button className="btn btn-danger btn-sm !font-bold !text-black !bg-amber-400 hover:!bg-amber-300 !px-2 !border-gray-900">
              View Details
            </button>
          </Link>
          <button
            // onClick={() => sendIdToModal(booking.id)}
            className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize"
          >
            Cancel Booking
          </button>
        </div>
        {/* <ConfirmModal
          handleOrderDelete={handleOrderDelete}
          show={show}
          handleClose={handleClose}
          orderId={orderId}
        /> */}
      </div>
    </Col>
  );
};

export default MyBookingCard;
