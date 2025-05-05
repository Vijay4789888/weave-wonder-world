
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">WeaveStyle</h2>
            <p className="mb-4">
              Premium clothing for the modern lifestyle. Quality fabrics, trendy designs, and comfortable fits for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-theme-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-theme-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-theme-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-theme-purple transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/men" className="hover:text-theme-purple transition-colors">Men</Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-theme-purple transition-colors">Women</Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-theme-purple transition-colors">Accessories</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-theme-purple transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/sale" className="hover:text-theme-purple transition-colors">Sale</Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-theme-purple transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-theme-purple transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-theme-purple transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-theme-purple transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-theme-purple transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-theme-purple transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Fashion Street, Design District, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>support@weavestyle.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} WeaveStyle. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
