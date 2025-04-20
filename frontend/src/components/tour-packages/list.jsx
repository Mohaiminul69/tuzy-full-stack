import React from "react";
import { destinationSlides } from "../../utils/mock-data/destinations-slider-data";
import MenuHover from "./menu-hover";
import { Container } from "react-bootstrap";
import "./packages.css";

const Packages = () => {
  return (
    <div className="menu background-dark">
      <Container className="pt-4 flex flex-col items-center md:items-start">
        <h1 className="fw-light text-uppercase mb-4 z-1">Packages</h1>
        <div className="custom-horizontal-line hidden md:block mb-5" />
        <MenuHover />
        {destinationSlides.map(({ name, img_src }) => (
          <div key={name} className="menu__item">
            <div className="menu__item-image-wrapper">
              <div className="menu__item-image_inner">
                <img src={img_src} alt="" className="menu__item-image" />
              </div>
            </div>
            <span className="menu__item-text">
              <span className="menu__item-innertext">{name}</span>
              <span className="menu__item-text_active" />
            </span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Packages;
