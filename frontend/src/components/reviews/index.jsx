import React, { useEffect } from "react";
import { destinationSlides } from "../../utils/mock-data/destinations-slider-data";
import { Container } from "react-bootstrap";
import "./reviews.css";

const Reviews = () => {
  useEffect(() => {
    const sliderDiv = document.getElementById("cursor-slider");

    if (!sliderDiv) return;

    const handleMouseLeave = (e) => {
      // Only trigger when the mouse truly leaves the window
      if (e.relatedTarget === null) {
        const percent = e.clientX / window.innerWidth;

        sliderDiv.animate(
          {
            transform: `translateX(${percent * sliderDiv.offsetWidth * -1}px)`,
          },
          {
            fill: "forwards",
            duration: 4000,
          }
        );
      }
    };

    window.addEventListener("mousemove", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseLeave);
    };
  }, []);

  return (
    <div className="background-dark">
      <Container className="px-5 pt-5">
        <div className="custom-horizontal-line" />
        <h1 className="fw-light text-uppercase mt-4">Reviews</h1>
      </Container>
      <div id="cursor-slider">
        {destinationSlides.map(({ name, img_src }) => (
          <a key={name} href="#">
            <span>{name}</span>
            <div className="img-wrapper">
              <img src={img_src} alt="" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
