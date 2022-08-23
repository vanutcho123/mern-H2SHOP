import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>Dashboard - H2SHOP</title>
      </Helmet>
      <Container className="mt-70">HAI</Container>
    </div>
  );
};
export default Dashboard;
