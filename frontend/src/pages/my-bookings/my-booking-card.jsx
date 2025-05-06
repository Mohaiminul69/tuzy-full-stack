import React, { useState } from "react";
import { useGetSinglePackageQuery } from "../../api/packages";
import { useGetSingleDestinationQuery } from "../../api/destinations";
import DeleteCard from "../../components/shared/delete-page/delete-card";
import ConfirmModal from "../../components/shared/modals/confirm-modal";
import AlertModal from "../../components/shared/modals/alert-modal";
import { useUpdateBookingMutation } from "../../api/bookings";

const MyBookingCard = ({ booking }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { package_id, destination_id } = booking;

  const locationId = package_id || destination_id;
  const callback = package_id
    ? useGetSinglePackageQuery
    : useGetSingleDestinationQuery;

  const { data: location } = callback(locationId);

  const [cancelBooking] = useUpdateBookingMutation();

  const handleConfirmModal = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const handleBookingCancel = (id) => {
    const formdata = new FormData();
    formdata.append("status", "cancelled");

    setShowConfirmModal(false);
    cancelBooking({ id, payload: formdata })
      .unwrap()
      .then(() => setShowAlert(true));
  };

  return (
    <>
      <DeleteCard
        location={location?.["package"] || location?.["destination"] || {}}
        type="booking"
        status={booking.status}
        bookingId={booking.id}
        handleConfirmModal={handleConfirmModal}
      />
      <ConfirmModal
        handleOrderDelete={handleBookingCancel}
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        entityId={selectedId}
        confirmTitle="Are you sure you want to cancel this booking?"
      />
      <AlertModal
        showAlert={showAlert}
        closeAlert={() => setShowAlert(false)}
        alertText="Booking cancelled"
      />
    </>
  );
};

export default MyBookingCard;
