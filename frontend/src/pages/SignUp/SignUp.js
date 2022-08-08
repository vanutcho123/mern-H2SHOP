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

import "./SignUp.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không chính xác");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
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
    <Container className="signUp small-container">
      <Helmet>
        <title>Đăng Ký - H2SHOP</title>
      </Helmet>
      <h1 className="my-3 text-center">Đăng ký</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Tên của bạn</Form.Label>
          <Form.Control required onChange={e => setName(e.target.value)} />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Đăng ký</Button>
        </div>
        <div className="mb-3">
          Bạn đã có tài khoản?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Đăng nhập</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
