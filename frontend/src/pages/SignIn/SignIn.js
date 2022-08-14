import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../../Context/Store";
import { toast } from "react-toastify";
import { getError } from "../../utils";

import "./SignIn.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  const submitHandler = async e => {
    e.preventDefault();
    if (!password) {
      toast.error("Email hoặc mật khẩu không chính xác!");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="signIn">
      <Container className="small-container mt-70 py-5">
        <Helmet>
          <title>Đăng Nhập - H2SHOP</title>
        </Helmet>
        <h1 className="my-3 title-global">Đăng Nhập</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" className="btn-global">
              Đăng nhập
            </Button>
          </div>
          <div className="mb-3">
            Bạn mới biết đến H2Shop?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Đăng ký tài khoản</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SignIn;
