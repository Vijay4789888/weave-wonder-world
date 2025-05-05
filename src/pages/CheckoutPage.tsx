
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Plus, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useAddresses } from '@/context/AddressContext';
import AddressForm from '@/components/AddressForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartSubtotal, cartSavings } = useCart();
  const { addresses, selectedAddressId, selectAddress } = useAddresses();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleAddNewAddress = () => {
    setIsAddressFormOpen(true);
    setIsAddressDialogOpen(false);
  };
  
  const handleAddressSelect = (addressId: string) => {
    selectAddress(addressId);
  };
  
  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      setIsAddressDialogOpen(true);
      return;
    }
    
    navigate('/payment');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address */}
          <div className="lg:col-span-2">
            {/* Delivery Address Section */}
            <div className="border rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Delivery Address</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddressDialogOpen(true)}
                >
                  {addresses.length > 0 ? "Change" : "Add Address"}
                </Button>
              </div>
              
              {selectedAddressId ? (
                <div>
                  {addresses.find(addr => addr.id === selectedAddressId) && (
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">
                          {addresses.find(addr => addr.id === selectedAddressId)?.name}
                        </div>
                        <div className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                          {addresses.find(addr => addr.id === selectedAddressId)?.type || "Home"}
                        </div>
                      </div>
                      <div className="text-gray-600 mb-2">
                        {addresses.find(addr => addr.id === selectedAddressId)?.address}
                      </div>
                      <div className="text-gray-600">
                        Contact: {addresses.find(addr => addr.id === selectedAddressId)?.phone}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500 mb-4">No delivery address selected</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddressDialogOpen(true)}
                    className="mx-auto"
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </div>
            
            {/* Order Summary for Mobile */}
            <div className="border rounded-lg p-4 block lg:hidden mb-6">
              <h3 className="font-semibold mb-2">Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h3>
              <div className="border-b pb-2 mb-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {cartSavings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{cartSavings}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Summary & Payment Button */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 sticky top-4">
              <h3 className="font-semibold pb-3 border-b mb-3">Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h3>
              
              <div className="space-y-2 mb-4">
                {/* Cart Items Summary */}
                <div className="max-h-60 overflow-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-2 py-2">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-grow">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <div className="flex text-xs text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          {item.size && <span className="ml-2">Size: {item.size}</span>}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Price Breakdown */}
                <div className="border-t pt-3 space-y-2">
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
                
                {/* Total */}
                <div className="border-t pt-3 font-medium flex justify-between">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              
              {/* Free delivery notice */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-6 text-center text-green-800">
                Yay! You get <span className="font-bold">FREE delivery</span> on this order
              </div>
              
              {/* Proceed Button */}
              <Button 
                className="w-full bg-theme-purple hover:bg-theme-darkPurple text-white py-6"
                onClick={handleProceedToPayment}
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
        </div>
      </main>
      <Footer />
      
      {/* Address Selection Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Address</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-auto p-1">
            {addresses.length > 0 ? (
              <RadioGroup value={selectedAddressId || ""} onValueChange={handleAddressSelect}>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className={`border rounded-lg p-4 relative ${selectedAddressId === address.id ? 'border-theme-purple bg-purple-50' : ''}`}
                    >
                      <RadioGroupItem 
                        value={address.id} 
                        id={`address-${address.id}`} 
                        className="absolute top-4 left-4"
                      />
                      <div className="pl-8">
                        <div className="flex justify-between mb-2">
                          <Label 
                            htmlFor={`address-${address.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {address.name}
                          </Label>
                          <div className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                            {address.type || "Home"}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{address.address}</p>
                        <p className="text-gray-600 text-sm">Contact: {address.phone}</p>
                        <div className="flex gap-3 mt-3">
                          <Button variant="link" className="p-0 h-auto text-theme-purple">EDIT</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-600 mb-4">No saved addresses</p>
              </div>
            )}
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={handleAddNewAddress} 
                className="w-full border-dashed border-gray-300"
              >
                <Plus size={18} className="mr-2" /> ADD NEW ADDRESS
              </Button>
            </div>
          </div>
          
          {addresses.length > 0 && (
            <div className="border-t pt-4">
              <Button 
                className="w-full bg-theme-purple hover:bg-theme-darkPurple"
                onClick={() => {
                  if (selectedAddressId) {
                    setIsAddressDialogOpen(false);
                  }
                }}
                disabled={!selectedAddressId}
              >
                SELECT ADDRESS
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Address Form Dialog */}
      <Dialog open={isAddressFormOpen} onOpenChange={setIsAddressFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <AddressForm onSuccess={() => setIsAddressFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
