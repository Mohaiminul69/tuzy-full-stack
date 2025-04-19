import React from "react";
import { Container, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import { useGetDestinationsQuery } from "../../api/destinations";
import DestinationCard from "./destination-card";
import "./destination.css";

const Destinations = () => {
  /*
<---------------------------- Fetching Tour Data from database ---------------------------->
*/
  const { data: locations = [], isFetching } = useGetDestinationsQuery();
  /*
<---------------------------- Slider Data ---------------------------->
*/
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 5,
          arrows: true,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          arrows: true,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  if (isFetching) {
    return (
      <div className="background-grey">
        <Container className="p-5 text-center">
          <div className="custom-horizontal-line" />
          <h1 className="fw-light text-uppercase mt-4 mb-3">Popular Tours</h1>
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="background-grey">
      <Container className="pt-2 pb-5 px-5 md:!px-0">
        <h1 className="fw-light text-uppercase mt-4 mb-4">Popular Tours</h1>
        <div className="custom-horizontal-line mb-5 hidden md:block" />
        <Slider {...settings}>
          {locations?.map((location) => (
            <DestinationCard key={location._id} location={location} />
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default Destinations;
