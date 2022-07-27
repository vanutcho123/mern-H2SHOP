import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
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
              <Route path="/product/:slug" element={<DetailProduct />} />
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
