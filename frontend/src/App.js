import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "../.././frontend/src/components/Home/Home";
import ProductDetails from "./components/product/productDetails";
import Login from "./components/user/login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/updateProfile";
import ProtectedRoute from "./components/route/protectedRoute";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/forgotPassword";
// import NewPassword from "./components/user/NewPassword"; same as the reset password
import ResetPassword from "./components/user/resetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/confirmOrder";
import Payment from "./components/Cart/Payment";
import store from "./store";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      console.log(data.stripeApiKey);
      setStripeApiKey(data.stripeApiKey);
      console.log(data.stripeApiKey);
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
            path="/me"
            element={
              // isAdmin={true}
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
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
