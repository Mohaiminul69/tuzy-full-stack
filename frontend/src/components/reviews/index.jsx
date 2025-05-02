import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useGetAllReviewsQuery } from "../../api/reviews";
import ReviewCard from "./review-card";
import "./reviews.css";

const Reviews = () => {
  const { data: reviews = [] } = useGetAllReviewsQuery();
  useEffect(() => {
    const sliderDiv = document.getElementById("review-slider");

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
    <div>
      <Container className="pt-4 flex flex-col items-center md:items-start">
        <h1 className="fw-light text-uppercase mb-4 text-black">Reviews</h1>
        <div className="custom-horizontal-line hidden md:block" />
      </Container>
      <div id="review-slider">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <span className="text-xs text-center block text-gray-500 pb-4 lowercase">
        We show you only the good reviews because we value positivity.
      </span>
    </div>
  );
};

export default Reviews;
