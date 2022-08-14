import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { Store } from "../../Context/Store";
import "./PaymentMethod.scss";
import Container from "react-bootstrap/esm/Container";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = e => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div className="paymentMethod">
      <Helmet>
        <title> Phương thức thanh toán - H2SHOP</title>
      </Helmet>
      <Container className="py-5 mt-70">
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="small-container mx-auto py-5">
          <h1 className="my-3 title-global">Phương thức thanh toán</h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                onChange={e => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName === "Stripe"}
                onChange={e => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Button type="submit" className="paymentMethod_btn">
                Tiếp tục
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};
export default PaymentMethod;
