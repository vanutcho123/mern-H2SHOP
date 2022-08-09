import React, { useEffect, useState } from "react";
import "./ScrollToTop.scss";

const ScrollToTop = () => {
  const [button, setButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const showButton = () => {
    window.scrollY > 250 ? setButton(true) : setButton(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", showButton);
    return () => {
      window.removeEventListener("scroll", showButton);
    };
  }, []);
  return (
    <div
      className={button ? "scroll-to-top show" : "scroll-to-top"}
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  );
};

export default ScrollToTop;
