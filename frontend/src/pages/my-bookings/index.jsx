import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useGetCurrentUsersBookingsQuery } from "../../api/bookings";
import MyBookingCard from "./my-booking-card";
import "./my-bookings.css";

const MyBookings = () => {
  const { data, isFetching } = useGetCurrentUsersBookingsQuery();
  const bookings = data?.bookings;

  if (isFetching) {
    return (
      <div className="bg-my-bookings py-5">
        <h1 className="display-2 my-5">My Orders</h1>
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-my-bookings py-5">
      <h1 className="display-2 my-5">My Orders</h1>
      <Container>
        {bookings.length === 0 ? (
          <h1 className="fw-light">You dont have any pending bookings !</h1>
        ) : (
          <Row>
            {bookings.map((booking) => (
              <MyBookingCard key={booking.id} booking={booking} />
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBookings;
