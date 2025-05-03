import React from "react";
import MenuHover from "./menu-hover";
import { Container, Spinner } from "react-bootstrap";
import { useGetAllPackagesQuery } from "../../api/packages";
import { useNavigate } from "react-router-dom";
import "./packages.css";

const Packages = () => {
  const navigate = useNavigate();
  const { data: packages, isFetching } = useGetAllPackagesQuery();

  if (isFetching) {
    return (
      <div className="bg-my-bookings py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="menu background-dark text-white">
      <Container className="pt-4 flex flex-col items-center md:items-start">
        <h1 className="fw-light text-uppercase mb-4 z-1">Packages</h1>
        <div className="custom-horizontal-line hidden md:block mb-5" />
        <MenuHover />
        {packages?.map(({ id, name, img_src, short_description }) => (
          <div key={id} className="menu__item">
            <div className="menu__item-image-wrapper">
              <div className="menu__item-image_inner">
                <img src={img_src} alt="" className="menu__item-image" />
              </div>
              <span>- {short_description}</span>
            </div>
            <span className="menu__item-text">
              <span
                onClick={() => navigate(`package/details/${id}`)}
                className="menu__item-innertext"
              >
                {name}
              </span>
              <span className="menu__item-text_active" />
            </span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Packages;
