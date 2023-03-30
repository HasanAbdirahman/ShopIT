import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "../.././frontend/src/components/Home/Home";
import ProductDetails from "./components/product/productDetails";
import Login from "./components/user/login";
import Register from "./components/user/Register";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
