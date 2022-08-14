import { React, useEffect, useReducer } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./SimilarProduct.scss";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// import required modules
import { Pagination, Autoplay } from "swiper";
//
import logger from "use-reducer-logger";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SimilarProduct = props => {
  const { category } = props;
  const [{ products }, dispatch] = useReducer(logger(reducer), {
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="similarProduct">
      <h2 className="similarProduct_title">Sản phẩm tương tự</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {products.map(
          product =>
            product.category === category && (
              <SwiperSlide key={product._id} className="py-4 px-0">
                <Card>
                  <Link to={`/product/${product.slug}`} className="product_img">
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <Card.Title className="text-center p-4">
                    {product.category}{" "}
                  </Card.Title>
                  <Link
                    to={`/product/${product.slug}`}
                    className="similarProduct_name"
                  >
                    <h3>{product.name}</h3>
                  </Link>
                </Card>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
};
export default SimilarProduct;
