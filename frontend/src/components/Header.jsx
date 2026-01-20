import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-gold/10">
      <div className="container-luxury">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="group">
            <h1 className="text-2xl md:text-3xl font-serif text-gold tracking-[0.2em] transition-all duration-300 group-hover:text-gold-light">
              ALVERRO
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 text-sm font-medium tracking-wider">
            <Link 
              to="/collections" 
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              Collections
            </Link>
            <Link 
              to="/shop" 
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              Shop
            </Link>
            <Link 
              to="/donna" 
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              Donna
            </Link>
            <Link 
              to="/new-season" 
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              New Season
            </Link>
            {user && user.role === 'admin' && (
               <Link 
                 to="/admin" 
                 className="text-gold hover:text-white transition-colors duration-300 uppercase font-bold border border-gold px-3 py-1"
               >
                 Admin Panel
               </Link>
            )}
            {/* ------------------------- */}
            <Link 
              to={user ? "/account" : "/login"} 
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              {user ? "Account" : "Sign In"}
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/shop?search=true')}
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 hidden sm:block"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate(user ? '/account' : '/login')}
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 hidden sm:block"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="text-warmWhite/80 hover:text-gold transition-colors duration-300 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {/* Cart badge would go here */}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-warmWhite/80 hover:text-gold transition-colors duration-300"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-6 space-y-4 animate-slide-down">
            <Link 
              to="/collections" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase text-sm tracking-wider py-2"
            >
              Collections
            </Link>
            <Link 
              to="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase text-sm tracking-wider py-2"
            >
              Shop
            </Link>
            <Link 
              to="/donna" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase text-sm tracking-wider py-2"
            >
              Donna
            </Link>
            <Link 
              to="/new-season" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase text-sm tracking-wider py-2"
            >
              New Season
            </Link>
            <Link 
              to={user ? "/account" : "/login"} 
              onClick={() => setIsMenuOpen(false)}
              className="block text-warmWhite/80 hover:text-gold transition-colors duration-300 uppercase text-sm tracking-wider py-2"
            >
              {user ? "Account" : "Sign In"}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
