import { Container, Spinner } from "react-bootstrap";
// import Slider from "react-slick";
import { useGetAllGallaryImagesQuery } from "../../api/gallary-images";
import SplitSlider from "./split-slider";
import "./gallary-images.css";

const Gallary = () => {
  const { data: images = [], isFetching } = useGetAllGallaryImagesQuery();

  // const settings = {
  //   arrows: false,
  //   infinite: true,
  //   centerMode: false,
  //   speed: 500,
  //   autoplay: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1250,
  //       settings: {
  //         slidesToShow: 6,
  //         arrows: true,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 769,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 580,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 414,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //   ],
  // };

  if (isFetching) {
    return (
      <div className="background-grey pt-5">
        <Container className="p-5 text-center">
          <div className="custom-horizontal-line" />
          <h1 className="fw-light text-uppercase my-4">Gallary</h1>
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  return (
    <div className="background-grey pt-5">
      <Container className="px-5">
        <div className="custom-horizontal-line" />
        <h1 className="fw-light text-uppercase my-4">Gallary</h1>
      </Container>
      <SplitSlider />
      <div className="infinite-slider-wrapper">
        {images.map(({ img_src, id }, idx) => (
          <div key={id} className={`itemLeft item${idx + 1}`}>
            <img src={img_src} alt="" />
          </div>
        ))}
      </div>
      {/* <Slider {...settings}>
      </Slider> */}
    </div>
  );
};

export default Gallary;
