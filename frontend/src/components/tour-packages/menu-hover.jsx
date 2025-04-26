import { useEffect } from "react";
import gsap from "gsap";

const MenuHover = () => {
  useEffect(() => {
    gsap.defaults({
      duration: 0.55,
      ease: "expo.out",
    });

    const tl = gsap.timeline();

    tl.set(".menu", { autoAlpha: 1 })
      .from(".menu__item-innertext", {
        delay: 1,
        duration: 1,
        x: 25,
        y: 125,
        stagger: 1,
        skewY: gsap.utils.wrap([-8, -8]),
        ease: "expo.out",
      })
      .set(".menu", { pointerEvents: "all" });

    const menuItems = document.querySelectorAll(".menu__item");

    menuItems.forEach((item) => {
      const imageWrapper = item.querySelector(".menu__item-image-wrapper");

      if (!imageWrapper) return;

      const imageWrapperBounds = imageWrapper.getBoundingClientRect();
      let itemBounds = item.getBoundingClientRect();

      const onMouseEnter = () => {
        gsap.set(imageWrapper, {
          scale: 0.8,
          x: 25,
          y: 50,
          rotation: -15,
        });
        gsap.to(imageWrapper, { opacity: 1, scale: 1, y: 0, rotation: -2 });
      };

      const onMouseLeave = () => {
        gsap.to(imageWrapper, {
          opacity: 0,
          y: -50,
          x: 25,
          scale: 0.8,
          rotation: -15,
        });
      };

      const onMouseMove = ({ clientX: x, clientY: y }) => {
        let yOffset = itemBounds.top / imageWrapperBounds.height;
        yOffset = gsap.utils.mapRange(0.1, 1.5, -150, 150, yOffset);

        gsap.to(imageWrapper, {
          duration: 1.25,
          x: Math.abs(x - itemBounds.left) - imageWrapperBounds.width / 1.55,
          y:
            Math.abs(y - itemBounds.top) -
            imageWrapperBounds.height / 2 -
            yOffset,
        });
      };

      item.addEventListener("mouseenter", onMouseEnter);
      item.addEventListener("mouseleave", onMouseLeave);
      item.addEventListener("mousemove", onMouseMove);

      window.addEventListener("resize", () => {
        itemBounds = item.getBoundingClientRect();
      });
    });
  }, []);

  return null;
};

export default MenuHover;
