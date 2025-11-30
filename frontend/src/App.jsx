import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">Shop - Coming Soon</h1></div>} />
            <Route path="/collections" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">Collections - Coming Soon</h1></div>} />
            <Route path="/new-season" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">New Season - Coming Soon</h1></div>} />
            <Route path="/cart" element={<div className="section-padding container-luxury"><h1 className="heading-section text-warmWhite">Cart - Coming Soon</h1></div>} />
            
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
    </AuthProvider>
  );
};

export default App;
