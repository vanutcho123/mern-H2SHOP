import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "../Rating/Rating";

import "./Product.scss";

const Product = props => {
  const { product } = props;
  return (
    <Card className="product" key={product.slug}>
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
        <div className="product_add-cart">
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
