
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, ShoppingCart, User, Menu, X, Heart 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { label: "Men", path: "/category/men" },
    { label: "Women", path: "/category/women" },
    { label: "Accessories", path: "/category/accessories" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Sale", path: "/sale" },
  ];

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-theme-purple">
            WeaveStyle
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.path}
                className="text-gray-700 hover:text-theme-purple transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative w-1/4">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-9"
            />
            <Search size={18} className="absolute left-2 text-gray-400" />
          </div>
          
          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-700 hover:text-theme-purple">
              <Heart size={22} />
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-theme-purple">
              <User size={22} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-theme-purple relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-theme-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <div className="flex items-center relative mb-4">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="pl-9"
              />
              <Search size={18} className="absolute left-2 text-gray-400" />
            </div>
            
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className="text-gray-700 hover:text-theme-purple transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex justify-between mt-4 pt-4 border-t">
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link 
                to="/account" 
                className="flex items-center space-x-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Account</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 text-gray-700 relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                <span className="absolute -top-2 left-3 bg-theme-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
