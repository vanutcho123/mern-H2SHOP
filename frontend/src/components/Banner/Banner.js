import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./Banner.scss";

// import required modules
import { Pagination, Autoplay } from "swiper";
//
import { banner1, banner2, banner3 } from "./import";

const Banner = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="banner"
      >
        <SwiperSlide>
          <img alt="" src={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src={banner2} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src={banner3} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Banner;
