
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/sonner';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartSubtotal, cartSavings } = useCart();
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Bag ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})</h1>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Savings Banner */}
              {cartSavings > 0 && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 flex items-center">
                  <Check size={20} className="text-green-500 mr-2" />
                  <span className="text-green-800">You are saving ₹{cartSavings} on this order</span>
                </div>
              )}
              
              {/* Buy X for Y offer banner */}
              <div className="bg-slate-50 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2 text-slate-700">Buy 3 for 999 offer applicable</span>
                </div>
                <Link to="/category/all" className="text-theme-purple font-medium">ADD ITEMS</Link>
              </div>
              
              {/* Cart Items */}
              <div className="border rounded-lg divide-y overflow-hidden">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              {/* Delivery Estimator */}
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-center text-blue-500">
                  <MapPin size={18} className="mr-2" />
                  <span className="font-medium">Enter pincode for delivery estimate</span>
                </div>
              </div>
              
              {/* Coupon/Offers */}
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">Coupons & Offers</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Apply Coupon / Gift Card</p>
                    <p className="text-sm text-gray-500">Crazy deals and other amazing offers</p>
                  </div>
                  <Button variant="link" className="text-theme-purple">VIEW</Button>
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Price Summary</h3>
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  {cartSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{cartSavings}</span>
                    </div>
                  )}
                </div>
                <div className="border-t pt-3 font-medium flex justify-between">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              
              {/* Free delivery notice */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-6 text-center text-green-800">
                Yay! You get <span className="font-bold">FREE delivery</span> on this order
              </div>
              
              {/* Checkout button */}
              <Button 
                className="w-full bg-theme-purple hover:bg-theme-darkPurple text-white py-6"
                onClick={handleCheckout}
              >
                PROCEED
              </Button>
              
              {/* Trust badges */}
              <div className="flex justify-between items-center mt-8">
                <div className="flex flex-col items-center text-center max-w-[80px]">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Check className="h-5 w-5 text-theme-purple" />
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">100% SECURE PAYMENT</p>
                </div>
                <div className="flex flex-col items-center text-center max-w-[80px]">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">EASY RETURNS & INSTANT REFUNDS</p>
                </div>
                <div className="flex flex-col items-center text-center max-w-[80px]">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">QUALITY ASSURANCE</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <img src="/placeholder.svg" alt="Empty cart" className="w-32 h-32 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your bag is empty!</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added anything to your bag yet.</p>
              <Link to="/">
                <Button className="bg-theme-purple hover:bg-theme-darkPurple text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
