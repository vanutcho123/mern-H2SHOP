import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../../Context/Store";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import axios from "axios";
import "./Profile.scss";
import Container from "react-bootstrap/esm/Container";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

const Profile = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  console.log(loadingUpdate);

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không chính xác");
      return;
    }
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Cập nhật thành công");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="profile">
      <Helmet>
        <title>Thông tin cá nhân - H2SHOP</title>
      </Helmet>
      <Container className="mt-70 py-5">
        <div className="small-container mx-auto">
          <h1 className="my-3 title-global">Thay đổi mật khẩu</h1>
          <form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="profile_name">Tên</Form.Label>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Button type="submit" className="btn-global">
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default Profile;
