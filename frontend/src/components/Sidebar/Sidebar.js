import { React, useReducer, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import logger from "use-reducer-logger";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Sidebar.scss";

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

const Sidebar = () => {
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
  const randomProducts = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  const getProducts = randomProducts(products, 5);
  return (
    <div className="sidebar">
      <h2 className="sidebar_title">Sản phẩm</h2>
      <span className="divider"></span>
      <ListGroup>
        {getProducts.map(product => (
          <ListGroup.Item key={product._id}>
            <Link to={`/product/${product.slug}`} className="product_img">
              <img src={product.image} alt={product.name} />
            </Link>
            <div>
              <Link to={`/product/${product.slug}`} className="product_name">
                <h2>{product.name}</h2>
              </Link>
              <p className="product_price">${product.currentPrice}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
