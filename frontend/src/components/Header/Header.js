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
  };
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="black"
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
              <Nav.Link>Giới thiệu</Nav.Link>
              <Nav.Link>Đồng hồ nam</Nav.Link>
              <Nav.Link>Đồng hồ nữ</Nav.Link>
              <Nav.Link>Đồng hồ đôi</Nav.Link>
              <NavDropdown title="Phụ Kiện" id="collasible-nav-dropdown">
                <NavDropdown.Item>Dây da</NavDropdown.Item>
                <NavDropdown.Item>Hộp đồng hồ</NavDropdown.Item>
                <NavDropdown.Item>Dịch vụ in logo lên đồng hồ</NavDropdown.Item>
                <NavDropdown.Item>Khắc laser lên đồng hồ</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#features">Tin tức</Nav.Link>

              <Nav.Link href="#pricing">Liên hệ</Nav.Link>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
