import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

import "./DetailProduct.scss";
import Rating from "../../components/Rating/Rating";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import { getError } from "../../utils";

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
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="detailProduct">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <div className="sidebar">
            <h2 className="sidebar-title">Sản phẩm</h2>
            <span className="divider"></span>
            <ListGroup>
              <ListGroup.Item>
                <img
                  src={product.image}
                  className="sidebar-img"
                  alt={product.name}
                />
                <div>
                  <h2 className="sidebar-name">{product.name}</h2>
                  <p className="sidebar-price">${product.currentPrice}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  src={product.image}
                  className="sidebar-img"
                  alt={product.name}
                />
                <div>
                  <h2 className="sidebar-name">{product.name}</h2>
                  <p className="sidebar-price">${product.currentPrice}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  src={product.image}
                  className="sidebar-img"
                  alt={product.name}
                />
                <div>
                  <h2 className="sidebar-name">{product.name}</h2>
                  <p className="sidebar-price">${product.currentPrice}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  src={product.image}
                  className="sidebar-img"
                  alt={product.name}
                />
                <div>
                  <h2 className="sidebar-name">{product.name}</h2>
                  <p className="sidebar-price">${product.currentPrice}</p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  src={product.image}
                  className="sidebar-img"
                  alt={product.name}
                />
                <div>
                  <h2 className="sidebar-name">{product.name}</h2>
                  <p className="sidebar-price">${product.currentPrice}</p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col md={9}>
          <Row>
            <Col md="7" className="position-relative overflow-hidden">
              <div className="detailProduct_img">
                <img src={product.image} alt={product.name} />
              </div>
              <div>
                {product.sale > 0 && (
                  <span className="detailProduct_sale">-{product.sale}%</span>
                )}
              </div>
              <div className="detailProduct_zoom">
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
              </div>
            </Col>
            <Col md="5">
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
                    <Button className="btn btn-primary add-to-cart">
                      THÊM VÀO GIỎ
                    </Button>
                  </div>
                ) : (
                  <p className="fw-bold fs-4 mb-4">
                    Sản phẩm này đã hết hàng hoặc không có sẵn.
                  </p>
                )}
                <div className="detailProduct_code">
                  Mã: <span>{product._id}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;
