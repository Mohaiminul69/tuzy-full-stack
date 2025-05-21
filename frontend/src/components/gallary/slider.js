import gsap from "gsap";

export const destinationSlides = [
  {
    name: "London",
    img_src: "https://i.ibb.co/zmHw3d2/pexels-nikita-khandelwal-800532.jpg",
  },
  {
    name: "Venice",
    img_src: "https://i.ibb.co/6XD8HKF/pexels-pixabay-258196.jpg",
  },
  {
    name: "Delhi",
    img_src:
      "https://i.ibb.co/JryB98D/15-155705-taj-mahal-india-travel-destinations-architecture-taj-mahal.jpg",
  },
  {
    name: "Rome",
    img_src: "https://i.ibb.co/StjJyYg/pexels-davi-pimentel-2064827.jpg",
  },
  {
    name: "Bali",
    img_src: "https://i.ibb.co/86prszs/pexels-timur-kozmenko-2474689.jpg",
  },
  {
    name: "Saint Martin",
    img_src:
      "https://i.ibb.co/jR5dSWj/ashraful-pranto-cnbw-Gzh-Y-jk-unsplash.jpg",
  },
  {
    name: "Cox's Bazar",
    img_src:
      "https://i.ibb.co/q76gYk4/ashraful-pranto-s-Z90-UEv0-CHw-unsplash.jpg",
  },
];

let currentIndex = 0;
let totalSlides = destinationSlides.length;

export const updateActiveSlide = () => {
  document.querySelectorAll(".title").forEach((el, index) => {
    if (index === currentIndex) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

export const handleSlider = () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  gsap.to(".slider-titles", {
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);

      updateImages(currentIndex);
    },
    x: `-${currentIndex * 11.1111}%`,
    duration: 1.5,
    ease: '"power4.out"',
  });
};

export const updateImages = (imageNumber) => {
  const imgSrc = destinationSlides[imageNumber]["img_src"];
  const imgTop = document.createElement("img");
  const imgBottom = document.createElement("img");

  imgTop.src = imgSrc;
  imgBottom.src = imgSrc;

  imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
  imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

  imgTop.style.transform = "scale(2)";
  imgBottom.style.transform = "scale(2)";

  const imgTopContainer = document.querySelector(".img-top");
  const imgBottomContainer = document.querySelector(".img-bottom");

  if (imgTopContainer) imgTopContainer.appendChild(imgTop);
  if (imgBottomContainer) imgBottomContainer.appendChild(imgBottom);

  gsap.to([imgTop, imgBottom], {
    clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
    scale: 1,
    duration: 2,
    ease: "power4.out",
    stagger: 0.15,
    onComplete: trimExcessImages,
  });
};

const trimExcessImages = () => {
  const selectors = [".img-top", ".img-bottom"];

  selectors.forEach((selector) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const images = Array.from(container.querySelectorAll(".img"));
    const excessCount = images.length - 7;

    if (excessCount > 0) {
      images
        .slice(0, excessCount)
        .forEach((image) => container.removeChild(image));
    }
  });
};
