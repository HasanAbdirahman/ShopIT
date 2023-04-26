import { useEffect, useState } from "react";
import "./App.css";
import store from "./store";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

// products imports
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "../.././frontend/src/components/Home/Home";
import ProductDetails from "./components/product/productDetails";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";

// authenticating imports
import Register from "./components/user/Register";
import Login from "./components/user/login";
import UpdateProfile from "./components/user/updateProfile";
import ProtectedRoute from "./components/route/protectedRoute";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/forgotPassword";
// import NewPassword from "./components/user/NewPassword"; same as the reset password
import ResetPassword from "./components/user/resetPassword";

// order imports
import OrderDetails from "./components/Orders/OrderDetails";
import OrderSuccess from "./components/Cart/OrderSuccess";
import ListOrders from "./components/Orders/ListOrders";

// cart imports
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/confirmOrder";
import Payment from "./components/Cart/Payment";

//  stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Admin imports
import Dashboard from "./components/Admin/Dashboard";
import ProductsLists from "./components/Admin/ProductsLists";
import NewProduct from "./components/Admin/NewProduct";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, loading } = useState((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/api/products/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}

          <Route
            path="/order/me"
            element={
              <ProtectedRoute>
                <ListOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />

          {/*  admin */}

          <Route
            path="/dashboard"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Route
          path="/admin/products"
          isAdmin={true}
          element={
            <ProtectedRoute>
              <ProductsLists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
      </div>

      {!loading && user.role === "admin" && <Footer />}
    </div>
  );
}

export default App;
