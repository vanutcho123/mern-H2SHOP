import React, { useState } from "react";
import "./Header.scss";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { Store } from "../../Context/Store";
import { Link } from "react-router-dom";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [navbar, setNavbar] = useState(false);

  const sticky = () => {
    const navbar = document.querySelector(".navbar");
    const navHeight = navbar.getBoundingClientRect().height;
    window.scrollY > navHeight ? setNavbar(true) : setNavbar(false);
  };
  window.addEventListener("scroll", sticky);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <header>
      <Navbar
        collapseOnSelect
        bg="black"
        expand="lg"
        variant="dark"
        className={navbar ? "navbar sticky py-3" : "navbar py-2"}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>H2SHOP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto text-capitalize">
              <Link to="/intro" className="nav-link">
                Giới thiệu
              </Link>
              <Link to="/donghonam" className="nav-link">
                Đồng Hồ Nam
              </Link>
              <Link to="/donghonu" className="nav-link">
                Đồng Hồ Nữ
              </Link>
              <Link to="/donghodoi" className="nav-link">
                Đồng Hồ Đôi
              </Link>
              <Link to="/phukien" className="nav-link">
                Phụ kiện
              </Link>
              <NavDropdown title="Tin tức" id="collasible-nav-dropdown">
                <NavDropdown.Item>Thị trường thế giới</NavDropdown.Item>
                <NavDropdown.Item>Thị trường trong nước</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>Liên hệ</Nav.Link>
            </Nav>
            <Nav>
              <Link to="/cart" className="nav-link">
                Giỏ hàng
                {cart.cartItems.length > 0 ? (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                ) : (
                  <Badge pill bg="danger">
                    0
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Lịch sử mua hàng</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Đăng xuất
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link ms-2" to="/signin">
                  Đăng nhập
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
