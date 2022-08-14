import { React, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/esm/Container";

import LoadingBox from "../../components/LoadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import Product from "../../components/Product/Product";
import Banner from "../../components/Banner/Banner";

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

const Home = () => {
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
    <div className="home">
      <Helmet>
        <title>H2SHOP - Trang web bán đồng hồ uy tín số 1 Việt Nam</title>
      </Helmet>
      <Banner />
      <div className="home_products">
        <Container className="py-5">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="products">
              {categories.map((category, index) => (
                <section className="py-5" key={index}>
                  <h2 className="products_title">{category}</h2>
                  {
                    <Row>
                      {products.map(
                        product =>
                          category === product.category && (
                            <Col
                              sm={6}
                              md={4}
                              lg={3}
                              className="mb-3"
                              key={product._id}
                            >
                              <Product product={product} />
                            </Col>
                          )
                      )}
                    </Row>
                  }
                </section>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;
