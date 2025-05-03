import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import toastStyle from "../../../utils/taost-style";
import { useCheckBookingQuery } from "../../../api/bookings";
import ReviewForm from "../forms/review-form";
import { useGetSpecificTourReviewsQuery } from "../../../api/reviews";
import Comment from "../forms/comment";
import "./details.css";

const DetailsPage = ({ callback, tourType }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const idType = `${tourType}_id`;

  const { data: reviews = [] } = useGetSpecificTourReviewsQuery({
    tourType,
    id,
  });

  const { data: bookingStatus, isFetching: isBookingLoading } =
    useCheckBookingQuery({ [idType]: id }, { skip: !isLoggedIn });
  const hasBooking = bookingStatus?.has_booking;

  const { data, isFetching } = callback(id);
  const viewData = data?.[tourType] || {};

  const onBooking = () => {
    if (!isLoggedIn) {
      toast.error("Please login first", toastStyle);
    }
    navigate(`/book/${tourType}/${id}`);
  };

  if (isFetching || isBookingLoading) {
    return (
      <div className="bg-my-bookings py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  const { name, img_src, short_description, price, description } = viewData;

  return (
    <div
      style={{
        background: `url("${img_src}") no-repeat center center/cover`,
      }}
      className="details_view_page py-5"
    >
      <Container className="mt-5">
        <Row>
          <Col sm={12} md={12} lg={4} className="mb-3">
            <img src={img_src} alt="" />
          </Col>
          <Col sm={12} md={12} lg={8} className="mb-3">
            <div className="details-card">
              <h1 className="display-2">{name}</h1>
              <div>
                {short_description && (
                  <p className="fw-light fs-5">{short_description}</p>
                )}
                <p className="fw-light">{description}</p>
              </div>
              <p className="fw-light fs-3">
                Visit {name} for only
                <span className="text-warning"> ${price}</span>
              </p>
              <div className="flex gap-x-4">
                <button
                  className="btn btn-danger btn-sm !font-bold !text-black !bg-amber-400 hover:!bg-amber-300 !px-2 !border-gray-900 !capitalize"
                  onClick={onBooking}
                >
                  <i className="fas fa-credit-card mr-2"></i>
                  book now
                </button>
                <button
                  className="btn btn-danger btn-sm !font-bold !bg-cyan-700 hover:!bg-cyan-800 !px-2 !border-gray-900 !capitalize"
                  onClick={() => navigate("/")}
                >
                  <i className="fas fa-chevron-left mr-2"></i>
                  back to home
                </button>
              </div>
            </div>
          </Col>
        </Row>
        {(reviews.length !== 0 || hasBooking) && (
          <div className="details-card mt-2 text-white">
            <h1>Reviews</h1>
            {hasBooking && <ReviewForm tourType={tourType} />}
            <div className="mt-2 space-y-2 w-full">
              {reviews.map((review) => (
                <Comment key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default DetailsPage;
