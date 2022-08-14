import { React, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

import Rating from "../Rating/Rating";
import { Store } from "../../Context/Store";
import "./Product.scss";

const Product = props => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async item => {
    const existItem = cartItems.find(x => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Xin lỗi! Sản phẩm đã hết hàng");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`} className="product_img">
        <img src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="product_content">
        <h4 className="product_category">{product.category}</h4>
        <Link to={`/product/${product.slug}`} className="product_name">
          <h3>{product.name}</h3>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="product_price">
          <span className="product_price-initial">
            $ {product.initialPrice}
          </span>
          <span className="product_price-current">
            $ {product.currentPrice}
          </span>
        </div>
        {product.sale > 0 && (
          <div className="product_sale">{product.sale}%</div>
        )}
        {product.countInStock === 0 && (
          <span className="product_countInStock">HẾT HÀNG</span>
        )}
        <div
          onClick={() => addToCartHandler(product)}
          className="product_add-cart"
        >
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
