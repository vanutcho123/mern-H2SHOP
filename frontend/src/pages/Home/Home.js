import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="products">
        {products.map(product => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`} className="product_img">
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product_content">
              <h4 className="product_category">{product.category}</h4>
              <Link to={`/product/${product.slug}`} className="product_name">
                <h3>{product.name}</h3>
              </Link>

              <div className="product_price">
                <span className="product_price-initial">
                  {product.initialPrice}
                </span>
                <span className="product_price-current">
                  {product.currentPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
