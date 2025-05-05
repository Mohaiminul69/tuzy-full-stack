import React from "react";
import { useGetAllBookingsQuery } from "../../api/bookings";
import { Container, Spinner } from "react-bootstrap";
import ListItem from "./list-item";
import "./manage-bookings.css";

const BookingList = () => {
  const { data: bookings, isFetching } = useGetAllBookingsQuery();

  if (isFetching) {
    return (
      <div className="manage-booking-page py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="manage-booking-page">
      <Container className="mt-5">
        <div className="items-center justify-center rounded-xl h-full">
          <table className="text-white min-w-full bg-black/70 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-black/70 !rounded-lg">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  User Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Destination / Package
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Phone Number
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Credit Card Number
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Booking Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Booking Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <ListItem key={idx} idx={idx} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default BookingList;
