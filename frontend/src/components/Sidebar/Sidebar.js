import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import "./Sidebar.scss";

const Sidebar = props => {
  console.log(props);
  const { product } = props;
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Sản phẩm</h2>
      <span className="divider"></span>
      <ListGroup>
        <ListGroup.Item>
          <img src={product.image} className="sidebar-img" alt={product.name} />
          <div>
            <h2 className="sidebar-name">{product.name}</h2>
            <p className="sidebar-price">${product.currentPrice}</p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <img src={product.image} className="sidebar-img" alt={product.name} />
          <div>
            <h2 className="sidebar-name">{product.name}</h2>
            <p className="sidebar-price">${product.currentPrice}</p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <img src={product.image} className="sidebar-img" alt={product.name} />
          <div>
            <h2 className="sidebar-name">{product.name}</h2>
            <p className="sidebar-price">${product.currentPrice}</p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <img src={product.image} className="sidebar-img" alt={product.name} />
          <div>
            <h2 className="sidebar-name">{product.name}</h2>
            <p className="sidebar-price">${product.currentPrice}</p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <img src={product.image} className="sidebar-img" alt={product.name} />
          <div>
            <h2 className="sidebar-name">{product.name}</h2>
            <p className="sidebar-price">${product.currentPrice}</p>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
