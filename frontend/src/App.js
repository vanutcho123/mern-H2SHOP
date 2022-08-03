import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Container className="py-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
