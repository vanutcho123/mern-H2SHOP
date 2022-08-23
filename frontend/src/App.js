import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import ShippingAddress from "./pages/ShippingAddress/ShippingAddress";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Order from "./pages/Order/Order";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Profile from "./pages/Profile/Profile";
import Intro from "./pages/Intro/Intro";
import { Male, FeMale, Couple, Accessory } from "./pages/Category/Category";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductList from "./pages/ProductList/ProductList";
import ProductEdit from "./pages/ProductEdit/ProductEdit";
import OrderList from "./pages/OrderList/OrderList";
import UserList from "./pages/UserList/UserList";
import UserEdit from "./pages/UserEdit/UserEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ToastContainer limit={1} className="mt-5" />
        <ScrollToTop />
        <Header />
        <main className="main">
          <div className="container-fluid">
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:slug" element={<DetailProduct />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/shipping" element={<ShippingAddress />}></Route>
              <Route path="/payment" element={<PaymentMethod />}></Route>
              <Route path="/placeorder" element={<PlaceOrder />}></Route>
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/intro" element={<Intro />}></Route>
              <Route path="/donghonam" element={<Male />} />
              <Route path="/donghonu" element={<FeMale />} />
              <Route path="/donghodoi" element={<Couple />} />
              <Route path="/phukien" element={<Accessory />} />
              {/* Admin routes */}
              <Route path="/" element={<Home />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEdit />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEdit />
                  </AdminRoute>
                }
              ></Route>
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
