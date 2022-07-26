import React, { useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-toastify";
import { getError } from "../../utils";

import { Store } from "../../Context/Store";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import "./PlaceOrder.scss";
import Container from "react-bootstrap/esm/Container";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.currentPrice, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div className="placeOrder">
      <Helmet>
        <title>Đặt hàng - H2SHOP</title>
      </Helmet>
      <Container className="mt-70 py-5">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="py-5">
          <h1 className="my-3 placeOrder_title">Chi tiết đơn hàng</h1>
          <Row>
            <Col md={8}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Thông tin thanh toán</Card.Title>
                  <Card.Text>
                    <strong>Tên:</strong> {cart.shippingAddress.fullName}
                    <br />
                    <strong>Địa chỉ: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},{cart.shippingAddress.country}
                    <br />
                    <strong>Mã bưu chính: </strong>{" "}
                    {cart.shippingAddress.postalCode}
                  </Card.Text>
                  <Link to="/shipping" className="placeOrder_edit">
                    Chỉnh sửa
                  </Link>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Thanh toán</Card.Title>
                  <Card.Text>
                    <strong>Phương thức:</strong> {cart.paymentMethod}
                  </Card.Text>
                  <Link to="/payment" className="placeOrder_edit">
                    Chỉnh sửa
                  </Link>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Sản phẩm</Card.Title>
                  <ListGroup variant="flush">
                    {cart.cartItems.map(item => (
                      <ListGroup.Item key={item._id}>
                        <Row className="placeOrder_product align-items-center">
                          <Col
                            md={8}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="placeOrder_product-img"
                            ></img>{" "}
                            <Link
                              to={`/product/${item.slug}`}
                              className="placeOrder_product-name"
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={2}>
                            <span className="fw-bold">{item.quantity}</span>
                          </Col>
                          <Col md={2} className="fw-bold">
                            ${item.currentPrice}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Link to="/cart" className="placeOrder_edit">
                    Chỉnh sửa
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Hoá đơn thanh toán</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Tổng cộng</Col>
                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Chi phí vận chuyển</Col>
                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong> Tổng tiền đơn hàng</strong>
                        </Col>
                        <Col>
                          <strong>${cart.totalPrice.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        className="btn-global placeOrder-btn"
                      >
                        Đặt hàng
                      </Button>
                      {loading && <LoadingBox></LoadingBox>}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default PlaceOrder;
