import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ShippingAddress from "./pages/ShippingAddress/ShippingAddress";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer limit={1} className="mt-5" />
        <Header />
        <main className="main">
          <Container className="py-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/shipping" element={<ShippingAddress />}></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
