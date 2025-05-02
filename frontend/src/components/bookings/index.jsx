import React from "react";
import { useCreateBookingMutation } from "../../api/bookings";
import CreateUpdateForm from "../shared/forms/create-update-form";
import { useParams } from "react-router-dom";

const formfields = [
  {
    fieldName: "phone_number",
    label: "phone number",
    placeholder: "Please enter your phone number",
  },
  {
    fieldName: "address",
    label: "address",
    placeholder: "Please enter your address",
  },
  {
    fieldName: "credit_card_number",
    label: "credit card number",
    placeholder: "Please enter your credit card number",
  },
  {
    fieldName: "booking_date",
    label: "booking date",
    placeholder: "Please the date when you want to book",
  },
  {
    fieldName: "destination_id",
    hidden: true,
  },
  {
    fieldName: "package_id",
    hidden: true,
  },
];

const BookingForm = () => {
  const [createBooking] = useCreateBookingMutation();
  const { tourType, id } = useParams();

  return (
    <CreateUpdateForm
      title="book trip"
      formfields={formfields}
      callback={createBooking}
      defaultValues={{ [`${tourType}_id`]: id }}
      alertText="your trip has been booked"
    />
  );
};

export default BookingForm;
