import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { banner, diamond, network, eye } from "./import";
import "./Intro.scss";

const Intro = () => {
  return (
    <div className="intro">
      <Container className="py-5 mt-70">
        <h2 className="intro_heading">H2SHOP MEDIA</h2>
        <div className="divider"></div>
        <img src={banner} alt="" className="intro_img" />
        <Row>
          <Col md={4}>
            <div className="intro_content">
              <div className="intro_icon">
                <img src={diamond} alt="" />
              </div>
              <div className="intro_text">
                <h3>CONCEPT</h3>
                <p>
                  Đồng hồ ngày nay đã trở thành một phụ kiện, một vật dụng không
                  thể thiếu của cánh nam giới và cả nữ giới. Việc đeo đồng hồ
                  không chỉ giúp quản lý thời gian mà còn thể hiện phong cách,
                  cá tính cũng như đẳng cấp của người đeo đồng hồ. Giá trị của
                  đồng hồ ngày nay đã không còn nhỏ. Chính vì thế bạn cần phải
                  có một website bán đồng hồ xứng tầm với giá trị của chúng
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="intro_content">
              <div className="intro_icon">
                <img src={network} alt="" />
              </div>
              <div className="intro_text">
                <h3>NETWORK</h3>
                <p>
                  Sở hữu một mẫu website bán đồng hồ giúp bạn trưng bày những
                  sản phẩm một cách thoải mái, không giới hạn và đầy đủ kiểu
                  cách. Việc thực hiện chiến dịch quảng cáo, marketing sẽ vô
                  cùng dễ dàng. Các sản phẩm sẽ được thể hiện hết những chi tiết
                  nổi bật. Và đặc biệt là khách hàng của bạn có thể dễ dàng tìm
                  thấy bạn trong xu thế “nhà nhà sử dụng internet, người người
                  lướt FB” như ngày nay.
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="intro_content">
              <div className="intro_icon">
                <img src={eye} alt="" />
              </div>
              <div className="intro_text">
                <h3>SEO</h3>
                <p>
                  Ở đây, H2SHOP Media xin cung cấp các mẫu website bán đồng hồ
                  đẹp nhất, sang trọng và nổi bật nhất. Các thiết kế website bán
                  đồng hồ đều được H2SHOP thiết kế chuẩn seo, thiết kế website
                  responsive. Đặc biệt là giao diện, màu sắc vô cùng bắt mắt và
                  sang trọng. Khách hàng sẽ xem và đặt sản phẩm một cách dễ
                  dàng. Cùng xem bên dưới bạn nhé!
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
