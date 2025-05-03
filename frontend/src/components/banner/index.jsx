import React from "react";
import { Carousel } from "react-bootstrap";
import "./banner.css";

const Banner = () => {
  return (
    <div className="slider-container">
      <Carousel className="custom-slider">
        <Carousel.Item className="slider-item">
          <img
            className="d-block w-100"
            src="https://i.ibb.co/tpKVHPN/pexels-artem-beliaikin-853199.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="slider-item">
          <img
            className="d-block w-100"
            src="https://i.ibb.co/6XD8HKF/pexels-pixabay-258196.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className="slider-item">
          <img
            className="d-block w-100"
            src="https://i.ibb.co/StjJyYg/pexels-davi-pimentel-2064827.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="banner-slogan">
        <img src="https://i.ibb.co/2tD3QrN/logo.png" alt="" />
        <h1 className="text-center text-white text-capitalize display-6">
          We make tourism fun and easy.
        </h1>
      </div>
    </div>
  );
};

export default Banner;
