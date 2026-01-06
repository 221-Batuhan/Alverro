import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountDashboard from "./pages/account/AccountDashboard";
import Profile from "./pages/account/Profile";
import Addresses from "./pages/account/Addresses";
import Payments from "./pages/account/Payments";
import Orders from "./pages/account/Orders";
import Settings from "./pages/account/Settings";
import About from "./pages/About";
import SizeGuide from "./pages/SizeGuide";
// Donna pages
import Donna from "./pages/Donna";
import CollectionPage from "./pages/donna/CollectionPage";
import DonnaProducts from "./pages/donna/DonnaProducts";
import ProductDetail from "./pages/donna/ProductDetail";
// Checkout pages
import CartReview from "./pages/checkout/CartReview";
import AddressSelection from "./pages/checkout/AddressSelection";
import Payment from "./pages/checkout/Payment";
import Review from "./pages/checkout/Review";
import Result from "./pages/checkout/Result";
// Test Product
import TestProduct from "./pages/TestProduct";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/size-guide" element={<SizeGuide />} /> 

              <Route path="/shop" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">Shop - Coming Soon</h1></div>} />
              <Route path="/collections" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">Collections - Coming Soon</h1></div>} />
              <Route path="/new-season" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">New Season - Coming Soon</h1></div>} />
              
              {/* Test Product - Ödeme Testi */}
              <Route path="/test-product" element={<TestProduct />} />
              
              {/* Donna Routes */}
              <Route path="/donna" element={<Donna />} />
              <Route path="/donna/:collectionSlug" element={<CollectionPage />} />
              <Route path="/donna/products" element={<DonnaProducts />} />
              <Route path="/donna/products/:id" element={<ProductDetail />} />
              
              {/* Cart & Checkout Routes */}
              <Route path="/cart" element={<CartReview />} />
              <Route path="/checkout/cart" element={<CartReview />} />
              <Route path="/checkout/address" element={<AddressSelection />} />
              <Route path="/checkout/payment" element={<Payment />} />
              <Route path="/checkout/review" element={<Review />} />
              <Route path="/checkout/result" element={<Result />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Account Routes */}
              <Route path="/account" element={<AccountDashboard />} />
              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/addresses" element={<Addresses />} />
              <Route path="/account/payments" element={<Payments />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/account/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;