import { useEffect } from "react";
import "./gallary-images.css";
import {
  destinationSlides,
  handleSlider,
  updateActiveSlide,
  updateImages,
} from "./slider";

const SplitSlider = () => {
  useEffect(() => {
    setInterval(() => handleSlider(), 5000);
    document.addEventListener("click", handleSlider);
    updateImages(0);
    updateActiveSlide();
  }, []);

  return (
    <div className="slider">
      <div className="slider-titles">
        {destinationSlides.map(({ name }) => (
          <div key={name} className="title">
            <h1>{name}</h1>
          </div>
        ))}
      </div>
      <div className="slider-images">
        <div className="img-top"></div>
        <div className="img-bottom"></div>
      </div>
    </div>
  );
};

export default SplitSlider;
