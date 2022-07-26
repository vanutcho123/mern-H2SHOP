import { React, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

import "./DetailProduct.scss";
import Rating from "../../components/Rating/Rating";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { getError } from "../../utils";
import { Store } from "../../Context/Store";
import Sidebar from "../../components/Sidebar/Sidebar";
import SimilarProduct from "../../components/SimilarProduct/SimilarProduct";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const DetailProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  //Context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find(x => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Xin Lỗi! Sản phẩm đã hết hàng");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return (
    <div className="detailProduct">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Container className="mt-70">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9} className="overflow-hidden">
              <Row className="border-bottom border-1 border-secondary">
                <Col
                  md="7"
                  className="position-relative overflow-hidden px-4 pb-5"
                >
                  <div className="detailProduct_img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div>
                    {product.sale > 0 && (
                      <span className="detailProduct_sale">
                        -{product.sale}%
                      </span>
                    )}
                  </div>
                  <div className="detailProduct_zoom">
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  </div>
                </Col>
                <Col
                  md="5"
                  className="position-relative overflow-hidden px-4 pb-5"
                >
                  <div className="detailProduct_info">
                    <nav>
                      <Link to="/" className="text-decoration-none">
                        Trang chủ
                      </Link>
                      <span>/</span>
                      <div>{product.category}</div>
                    </nav>
                    <h2 className="detailProduct_name">{product.name}</h2>
                    <span className="divider"></span>
                    <div className="d-flex fs-2 gap-4 my-3">
                      <span className="text-decoration-line-through">
                        ${product.initialPrice}
                      </span>
                      <span className="fw-bold">${product.currentPrice}</span>
                    </div>
                    <Rating
                      numReviews={product.numReviews}
                      rating={product.rating}
                    />
                    <p className="mb-4">{product.description}</p>
                    <div className="mb-4"></div>
                    {product.countInStock > 0 ? (
                      <div className="mb-5">
                        <Button
                          onClick={addToCartHandler}
                          className="btn btn-primary add-to-cart"
                        >
                          THÊM VÀO GIỎ
                        </Button>
                      </div>
                    ) : (
                      <p className="fw-bold fs-4 mb-4">
                        Sản phẩm này đã hết hàng hoặc không có sẵn.
                      </p>
                    )}
                    <div className="detailProduct_code">
                      Mã: <span className="fw-bold">{product._id}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <SimilarProduct category={product.category} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DetailProduct;
