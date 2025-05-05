import React from "react";
import { useGetSingleUserQuery } from "../../api/users";
import { useGetSinglePackageQuery } from "../../api/packages";
import { useGetSingleDestinationQuery } from "../../api/destinations";
import { Spinner } from "react-bootstrap";

const ListItem = ({ booking, idx }) => {
  const { user_id, destination_id, package_id, status } = booking;
  const locationCallback = package_id
    ? useGetSinglePackageQuery
    : useGetSingleDestinationQuery;

  const { data, isFetching } = useGetSingleUserQuery(user_id);
  const { data: locationData } = locationCallback(destination_id || package_id);

  const { first_name, last_name, img_src } = data?.user || {};
  const { name, img_src: locationImg } =
    locationData?.["package"] || locationData?.["destination"] || {};

  let statusColor = "text-amber-400";
  if (status === "approved") statusColor = "text-teal-700";
  else if (status === "cancelled") statusColor = "text-[#a93939]";

  const showAction = status !== "cancelled" && status !== "approved";
  const not_applicable = (
    <span className="bg-black/40 w-fit py-1 px-2 rounded-2">N / A</span>
  );

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
        className={`px-4 py-2.5 text-sm !border-b-2 border-black ${statusColor}`}
      >
        <div className="bg-black/40 w-fit py-1 px-2 rounded-2">{status}</div>
      </td>
      <td
        className={`px-4 py-2.5 text-sm text-center !border-b-2 border-black`}
      >
        {showAction ? (
          <div className="flex gap-2 justify-center">
            <button className="btn btn-danger btn-sm !font-bold !bg-cyan-800 hover:!bg-cyan-900 !px-2 !border-gray-900 !capitalize">
              <i className="fas fa-check"></i>
            </button>
            <button className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ) : (
          not_applicable
        )}
      </td>
    </tr>
  );
};

export default ListItem;
