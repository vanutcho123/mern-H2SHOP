import "./App.scss";
import Header from "./components/Header/Header";
// import Products from "./components/Products/Products";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<Product />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
