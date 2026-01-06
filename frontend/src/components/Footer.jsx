import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[black] border-t border-gold/10">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-serif text-gold tracking-widest mb-6">ALVERRO</h2>
            <p className="text-warmWhite/70 text-sm leading-relaxed mb-6">
              Italian luxury heritage. Crafted with tradition, designed for the modern gentleman.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-warmWhite/60 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-warmWhite/60 hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-warmWhite/60 hover:text-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-warmWhite font-medium uppercase tracking-wider text-sm mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/donna" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Donna
                </Link>
              </li>
              <li>
                <Link to="/new-season" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  New Season
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/collections?filter=heritage" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-warmWhite font-medium uppercase tracking-wider text-sm mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-warmWhite font-medium uppercase tracking-wider text-sm mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-warmWhite/70 hover:text-gold transition-colors duration-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warmWhite/50 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} ALVERRO. All rights reserved.
          </p>
          <p className="text-warmWhite/50 text-xs">
            Made with craftsmanship in Italy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

