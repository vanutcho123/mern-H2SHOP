import React from "react";
import "./Footer.scss";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";

const Footer = () => {
  return (
    <div className="footer bg-black text-white">
      <Container className="py-40">
        <Row>
          <Col lg={3}>
            <div className="p-30">
              <h3 className="mb-4 fs-2">ĐIỀU HƯỚNG</h3>
              <div>
                <a href="#!">
                  <i className="fab fa-facebook"></i> Facebook
                </a>

                <a href="#!">
                  <i className="fab fa-instagram"></i> InStagram
                </a>
                <a href="#!">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center p-30-60 mt-30">
              <h1 className="footer_logo">Gr3SHOP</h1>
              <div>
                <p>
                  Là một website bán hàng trực tuyến.Nơi tập trung các dòng sản
                  phẩm , thương hiệu cao cấp.Bảo đảm chất lượng mang đến cho bạn
                  một trải nghiệm tốt nhất!!!!
                </p>
                <Form className="mt-50">
                  <Form.Group className="position-relative overflow-hidden">
                    <Form.Control type="input" placeholder="Email..." />
                    <span className="icon-enter">{"-->"}</span>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <div className="p-30">
              <h3 className="mb-4 fs-2">THÔNG TIN LIÊN HỆ</h3>
              <div>
                <p>08-HÀ VĂN TÍNH-HOÀ KHÁNH NAM-LIÊN CHIỂU-ĐÀ NẴNG</p>
                <p>0867405503</p>
                <p>hainguyen.061001@gmail.com</p>
                <p>nguyenvanhai13@dtu.edu.vn</p>
                <p>nguyenvanhai</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center footer_end">
        Create by NGUYENVANHAI| 2022 All Right reserved.
      </div>
    </div>
  );
};

export default Footer;
