
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAddresses } from '@/context/AddressContext';

const ThankYouPage = () => {
  const { addresses, selectedAddressId } = useAddresses();
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Success Banner */}
      <div className="bg-green-500 text-white py-2 text-center">
        <p className="font-medium">Shopping Protection is ON, you are visiting bewakoof</p>
      </div>
      
      <main className="container mx-auto px-4 pt-16 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Shopping Bag Animation */}
          <div className="mb-8 relative">
            <div className="w-36 h-36 bg-yellow-300 rounded-lg mx-auto flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute -top-6 right-1/3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-1">Order Confirmed!</h1>
          <p className="text-xl text-gray-700 mb-12">Thank you for shopping!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
            {/* Delivery Address */}
            <div className="border bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Delivering to:</h2>
              
              {selectedAddress ? (
                <div>
                  <div className="flex gap-2">
                    <p className="font-medium">{selectedAddress.name}</p>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      {selectedAddress.type || "Other"}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{selectedAddress.address}</p>
                  <p className="text-gray-700">{selectedAddress.city}, {selectedAddress.state}, {selectedAddress.pincode}</p>
                </div>
              ) : (
                <p className="text-gray-500">No delivery address selected</p>
              )}
              
              <div className="mt-6 border-t pt-4">
                <Link to="/order-details" className="text-theme-purple font-medium">ORDER DETAILS</Link>
              </div>
            </div>
            
            {/* Rating */}
            <div className="border bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Enjoying the Bewakoof experience?</h2>
              <p className="text-gray-600 mb-4">Let us know how we are doing</p>
              
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button 
                    key={rating} 
                    className={`w-10 h-10 rounded-full ${
                      rating === 5 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    } flex items-center justify-center font-medium`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6"
            asChild
          >
            <Link to="/">
              CONTINUE SHOPPING
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
