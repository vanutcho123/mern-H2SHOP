import "./App.scss";
import Header from "./components/Header/Header";
// import Products from "./components/Products/Products";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<Product />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            Create by NGUYENVANHAI| 2021 All Right reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
