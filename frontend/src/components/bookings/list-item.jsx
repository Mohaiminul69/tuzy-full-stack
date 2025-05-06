import React, { useState } from "react";
import { useGetSingleUserQuery } from "../../api/users";
import { useGetSinglePackageQuery } from "../../api/packages";
import { useGetSingleDestinationQuery } from "../../api/destinations";
import getStatusColor from "../../utils/status-color";
import { Spinner } from "react-bootstrap";
import { useUpdateBookingMutation } from "../../api/bookings";
import ConfirmModal from "../shared/modals/confirm-modal";
import AlertModal from "../shared/modals/alert-modal";

const ListItem = ({ booking, idx }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [updateStatus, setupdateStatus] = useState(null);
  const [alertText, setAlertText] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { user_id, destination_id, package_id, status, id } = booking;
  const locationCallback = package_id
    ? useGetSinglePackageQuery
    : useGetSingleDestinationQuery;

  const { data, isFetching } = useGetSingleUserQuery(user_id);
  const { data: locationData } = locationCallback(destination_id || package_id);
  const [updateBookingStatus] = useUpdateBookingMutation();

  const { first_name, last_name, img_src } = data?.user || {};
  const { name, img_src: locationImg } =
    locationData?.["package"] || locationData?.["destination"] || {};

  const showAction = status !== "cancelled" && status !== "approved";
  const not_applicable = (
    <span className="bg-black/40 w-fit py-1 px-2 rounded-2">N / A</span>
  );

  const handleConfirmModal = (id, status) => {
    setSelectedId(id);
    const confirmText = status === "approved" ? "approve" : "cancel";
    setConfirmTitle(`Do you want to ${confirmText} booking?`);
    setAlertText(`Booking ${status}d`);
    setupdateStatus(status);
    setShowConfirmModal(true);
  };

  const handleStatusUpdate = () => {
    const formdata = new FormData();
    formdata.append("status", updateStatus);

    setShowConfirmModal(false);
    updateBookingStatus({ id: selectedId, payload: formdata })
      .unwrap()
      .then(() => setShowAlert(true));
  };

  if (isFetching)
    return (
      <tr className="border-t border-black/90 capitalize text-center">
        <Spinner animation="border" variant="danger" />
      </tr>
    );

  return (
    <tr className="border-t border-black/90 capitalize">
      <td className="px-4 py-2.5 text-sm !border-b-2 border-black">
        {idx + 1}
      </td>
      <td className="px-4 py-2.5 text-sm !border-b-2 border-black">
        <div className="flex items-center gap-2">
          <img
            className="w-[30px] h-[30px] rounded-full border-2"
            src={img_src}
            alt=""
          />
          {first_name} {last_name}
        </div>
      </td>
      <td className="px-4 py-2.5 text-sm !border-b-2 border-black">
        <div className="flex items-center gap-2">
          <img
            className="w-[30px] h-[30px] rounded-full border-2"
            src={locationImg}
            alt=""
          />
          {name}
        </div>
      </td>
      <td className="px-4 py-2.5 text-sm !border-b-2 border-black">
        {booking.phone_number}
      </td>
      <td className="px-4 py-2.5 text-sm !border-b-2 border-black">
        {booking.credit_card_number}
      </td>
      <td className="px-4 py-2.5 text-sm !border-b-2 border-black">
        {booking.booking_date}
      </td>
      <td
        className={`px-4 py-2.5 text-sm !border-b-2 border-black ${getStatusColor(
          status
        )}`}
      >
        <div className="bg-black/40 w-fit py-1 px-2 rounded-2">{status}</div>
      </td>
      <td
        className={`px-4 py-2.5 text-sm text-center !border-b-2 border-black`}
      >
        {showAction ? (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleConfirmModal(id, "approved")}
              className="btn btn-danger btn-sm !font-bold !bg-cyan-800 hover:!bg-cyan-900 !px-2 !border-gray-900 !capitalize"
            >
              <i className="fas fa-check"></i>
            </button>
            <button
              onClick={() => handleConfirmModal(id, "cancelled")}
              className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ) : (
          not_applicable
        )}
      </td>
      <ConfirmModal
        handleOrderDelete={handleStatusUpdate}
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
    </tr>
  );
};

export default ListItem;
