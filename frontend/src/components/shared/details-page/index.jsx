import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import toastStyle from "../../../utils/taost-style";
import "./details.css";

const DetailsPage = ({ callback, dataType }) => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = callback(id);
  const viewData = data?.[dataType];

  const onBooking = () => {
    if (!isLoggedIn) {
      toast.error("Please login first", toastStyle);
    }
    navigate("/book");
  };

  if (isFetching) {
    return (
      <div className="bg-my-orders py-5">
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
            <div className="details_card">
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
      </Container>
    </div>
  );
};

export default DetailsPage;
