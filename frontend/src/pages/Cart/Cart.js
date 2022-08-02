import { React, useContext } from "react";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

import { Store } from "../../Context/Store";
import MessageBox from "../../components/MessageBox/MessageBox";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
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
  const removeItemHandler = item => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div className="cart">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      {cartItems.length === 0 ? (
        <Row>
          <Col md={12}>
            <MessageBox variant="light">
              <div className="text-center text-black py-50">
                Chưa có sản phẩm nào trong giỏ hàng
                <div className="back-products">
                  <Link to="/">Quay lại trở lại cửa hàng</Link>
                </div>
              </div>
            </MessageBox>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={7} className="px-4">
            <Table className="table">
              <thead>
                <tr className="border-bottom border-2 border-secondary">
                  <th colSpan="3">Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr className="cart_product " key={item._id}>
                    <th className="cart_product-remove">
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </th>
                    <th className="cart_product-image">
                      <img src={item.image} alt={item.name} />
                    </th>
                    <th className="cart_product-name">
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </th>
                    <th className="cart_product-price">
                      <span>$</span>
                      <span>{item.currentPrice}</span>
                    </th>
                    <th className="cart_product-quantity">
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="back-products">
              <Link to="/">Tiếp tục xem sản phẩm</Link>
            </div>
          </Col>
          <Col md={5} className="px-5 cart_left">
            <Table className="table fs-4">
              <thead className="w-full">
                <tr className="border-bottom border-2 border-secondary">
                  <th colSpan={2}>Tổng sản phẩm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="fw-normal">Số lượng sản phẩm: </th>
                  <th className="text-right">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </th>
                </tr>
                <tr>
                  <th className="fw-normal">Tổng cộng: </th>
                  <th className="text-right">
                    {"$"}
                    {cartItems.reduce(
                      (a, c) => a + c.currentPrice * c.quantity,
                      0
                    )}
                  </th>
                </tr>
                <tr>
                  <th className="fw-normal">Giao hàng</th>
                  <th>
                    <div className="d-flex flex-column fw-normal text-right">
                      <span>Giao hàng miễn phí</span>
                      <span>Tính phí giao hàng</span>
                    </div>
                  </th>
                </tr>
              </tbody>
            </Table>
            <div className="cart_proceed d-grid">
              <Button
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Tiến hành thanh toán
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Cart;
