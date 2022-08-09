import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CheckoutSteps.scss";
const CheckoutSteps = props => {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Đăng nhập</Col>
      <Col className={props.step2 ? "active" : ""}>Chọn hàng</Col>
      <Col className={props.step3 ? "active" : ""}>Thanh toán</Col>
      <Col className={props.step4 ? "active" : ""}>Đặt hàng</Col>
    </Row>
  );
};
export default CheckoutSteps;
