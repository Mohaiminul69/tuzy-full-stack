import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-background">
      <Container className="not-found-div">
        <h1 className="display-1 !text-[#a93939]">404</h1>
        <h1 className="display-4">Destination Not Found</h1>
        <h1 className="fw-light">Looks like you are lost in the woods !!</h1>
        <div className="my-3 flex gap-x-4">
          <Link to="/">
            <button className="btn btn-danger btn-sm !font-bold !bg-cyan-700 hover:!bg-cyan-800 !px-2 !border-gray-900 !capitalize">
              <i className="fas fa-home mr-2"></i>
              Homepage
            </button>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-danger btn-sm !font-bold !bg-cyan-700 hover:!bg-cyan-800 !px-2 !border-gray-900 !capitalize"
          >
            <i className="fas fa-chevron-left mr-2"></i>
            Go Back
          </button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
