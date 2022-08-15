import { React, useEffect, useReducer } from "react";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import logger from "use-reducer-logger";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";

import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import Card from "react-bootstrap/Card";
import Product from "../../../components/Product/Product";

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

const Accessory = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
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

  const categoriesArr = products.map(item => {
    return item.category;
  });
  const categories = categoriesArr.reduce((acc, element) => {
    if (acc.indexOf(element) === -1) {
      acc.push(element);
    }
    return acc;
  }, []);

  return (
    <div className="male">
      <Helmet>
        <title>Đồng hồ nam - H2SHOP</title>
      </Helmet>
      <Container className="py-5 mt-70">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          categories.map(
            (category, index) =>
              category === "PHỤ KIỆN" && (
                <div key={index}>
                  <nav className="d-flex gap-5  mb-3 fs-3">
                    <Link
                      to="/"
                      className="text-decoration-none text-secondary"
                    >
                      TRANG CHỦ
                    </Link>
                    <span>/</span>
                    <div className="fw-bold">{category}</div>
                  </nav>
                  <Row className="py-5">
                    <Col md={3}>
                      <h3>DANH MỤC SẢN PHẨM</h3>
                      <div className="divider"></div>
                      <Card className="py-4 px-3">
                        <Link
                          to="/donghonam"
                          className="text-secondary text-capitalize fs-4 py-2 hover"
                        >
                          Đồng hồ nam
                        </Link>
                        <Link
                          to="/donghonu"
                          className="text-secondary text-capitalize fs-4 py-2 hover"
                        >
                          Đồng hồ nữ
                        </Link>
                        <Link
                          to="/donghodoi"
                          className="text-secondary text-capitalize fs-4 py-2 hover"
                        >
                          Đồng hồ đôi
                        </Link>
                        <Link
                          to="/phukien"
                          className="text-secondary text-capitalize fs-4 py-2 hover"
                        >
                          Phụ kiện
                        </Link>
                      </Card>
                    </Col>
                    <Col md={9}>
                      <Row>
                        {products.map(
                          product =>
                            category === product.category && (
                              <Col
                                sm={6}
                                md={4}
                                lg={4}
                                className="mb-3"
                                key={product._id}
                              >
                                <Product product={product} />
                              </Col>
                            )
                        )}
                      </Row>
                    </Col>
                  </Row>
                </div>
              )
          )
        )}
      </Container>
    </div>
  );
};

export default Accessory;
