
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';
import { useAddresses } from '@/context/AddressContext';
import { toast } from '@/components/ui/sonner';

type PaymentMethod = 'card' | 'wallet' | 'upi' | 'netbanking' | 'cod';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartSubtotal, cartSavings, clearCart } = useCart();
  const { addresses, selectedAddressId } = useAddresses();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [itemsSummaryOpen, setItemsSummaryOpen] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  
  // Get selected address
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
  
  if (cart.length === 0 || !selectedAddressId) {
    navigate('/cart');
    return null;
  }
  
  const handlePayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      navigate('/thank-you');
    }, 1500);
  };
  
  const displayCardLogos = () => (
    <div className="flex items-center gap-3 mt-2 mb-4">
      <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 w-auto opacity-60" />
      <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-6 w-auto opacity-60" />
      <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="Rupay" className="h-6 w-auto opacity-60" />
      <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Amex" className="h-6 w-auto opacity-60" />
    </div>
  );
  
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="mt-4 space-y-4">
            {displayCardLogos()}
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Valid Through (MM/YY)</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on the Card</Label>
              <Input id="nameOnCard" placeholder="John Doe" />
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="saveCard" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
              <label
                htmlFor="saveCard"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save your card for future transactions
              </label>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              By saving this card you can avoid entering the card details everytime for transaction on Bewakoof. We don't save your CVV number.
            </p>
            
            <Button 
              className="w-full mt-6 bg-theme-purple hover:bg-theme-darkPurple py-6"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `PAY ₹${cartTotal}`}
            </Button>
          </div>
        );
        
      case 'cod':
        return (
          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center text-blue-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Pay Cash on Delivery</span>
              </div>
              <p className="text-sm text-blue-600">
                Additional cash collection charges of ₹ 20 is applicable on this order.
              </p>
            </div>
            
            <div className="flex items-center text-blue-600 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Refunds on Returns</span>
            </div>
            
            <Button 
              className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-6"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `PAY ₹${cartTotal + 20}`}
            </Button>
            
            <div className="text-center">
              <div className="inline-block font-medium text-gray-400 my-3">OR</div>
            </div>
            
            <p className="text-center text-sm text-gray-600 mb-2">
              Pay via UPI or Card and save handling charges
            </p>
            
            <Button 
              variant="outline"
              className="w-full border-theme-purple text-theme-purple hover:bg-theme-purple/10"
              onClick={() => setPaymentMethod('card')}
            >
              Pay now and save ₹ 20
            </Button>
          </div>
        );
        
      case 'wallet':
      case 'upi':
      case 'netbanking':
        return (
          <div className="mt-4 p-6 text-center">
            <div className="text-gray-500 mb-4">
              This payment method is currently unavailable.
            </div>
            <Button 
              variant="outline"
              onClick={() => setPaymentMethod('card')}
            >
              Try another payment method
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Bewakoof</h1>
            <div className="text-sm text-gray-600">
              Signed as <span className="font-medium">user@example.com</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Choose Your Payment Method</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Payment Method Selector */}
              <div className="lg:col-span-2 bg-white rounded-lg border h-fit">
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="divide-y">
                    <div className={`p-4 flex items-center ${paymentMethod === 'card' ? 'border-l-4 border-theme-purple' : ''}`}>
                      <RadioGroupItem value="card" id="card" className="mr-3" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 mr-3" />
                        <span>Debit & Credit Card</span>
                      </Label>
                    </div>
                    
                    <div className={`p-4 flex items-center ${paymentMethod === 'wallet' ? 'border-l-4 border-theme-purple' : ''}`}>
                      <RadioGroupItem value="wallet" id="wallet" className="mr-3" />
                      <Label htmlFor="wallet" className="flex items-center cursor-pointer flex-1">
                        <Wallet className="h-5 w-5 mr-3" />
                        <span>Wallet</span>
                      </Label>
                    </div>
                    
                    <div className={`p-4 flex items-center ${paymentMethod === 'upi' ? 'border-l-4 border-theme-purple' : ''}`}>
                      <RadioGroupItem value="upi" id="upi" className="mr-3" />
                      <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                          <path d="m18 8-6 5-6-5" />
                        </svg>
                        <span>UPI</span>
                      </Label>
                    </div>
                    
                    <div className={`p-4 flex items-center ${paymentMethod === 'netbanking' ? 'border-l-4 border-theme-purple' : ''}`}>
                      <RadioGroupItem value="netbanking" id="netbanking" className="mr-3" />
                      <Label htmlFor="netbanking" className="flex items-center cursor-pointer flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="8" width="18" height="12" rx="2" />
                          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                          <path d="M12 14v.01" />
                        </svg>
                        <span>Net banking</span>
                      </Label>
                    </div>
                    
                    <div className={`p-4 flex items-center ${paymentMethod === 'cod' ? 'border-l-4 border-theme-purple' : ''}`}>
                      <RadioGroupItem value="cod" id="cod" className="mr-3" />
                      <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="6" width="20" height="12" rx="2" />
                          <path d="M12 12h4" />
                          <path d="M12 16V8" />
                        </svg>
                        <span>Cash On Delivery</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Payment Form */}
              <div className="lg:col-span-3 bg-white rounded-lg border p-6">
                {paymentMethod === 'card' && (
                  <div className="flex justify-center">
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Trusted by 1.5 CR Customers</span>
                    </div>
                  </div>
                )}
                
                {renderPaymentForm()}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            {/* Delivery Address Summary */}
            <div className="bg-white rounded-lg border p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Delivering order to {selectedAddress?.name.split(' ')[0]}</h3>
                <div className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                  {selectedAddress?.type || 'other'}
                </div>
              </div>
              <Button 
                variant="link" 
                className="px-0 h-auto text-theme-purple"
                onClick={() => navigate('/checkout')}
              >
                Change
              </Button>
            </div>
            
            {/* Items Summary */}
            <div className="bg-white rounded-lg border mb-4">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setItemsSummaryOpen(!itemsSummaryOpen)}
              >
                <h3 className="font-medium">Item ({cart.length})</h3>
                <ChevronDown 
                  className={`transition-transform duration-200 ${itemsSummaryOpen ? 'transform rotate-180' : ''}`} 
                  size={20} 
                />
              </div>
              
              {itemsSummaryOpen && (
                <div className="px-4 pb-4 border-t">
                  <div className="max-h-48 overflow-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-2 py-2 border-b last:border-b-0">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-grow">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <div className="flex text-xs text-gray-500">
                            <span>Qty: {item.quantity}</span>
                            {item.size && <span className="ml-2">Size: {item.size}</span>}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          ₹{item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Price Summary */}
            <div className="bg-white rounded-lg border mb-4">
              <div className="p-4 flex justify-between items-center">
                <h3 className="font-medium">Price Summary</h3>
                <ChevronDown size={20} />
              </div>
              
              <div className="px-4 pb-4 border-t">
                <div className="space-y-2 py-3">
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
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-gray-600">
                      <span>COD Handling Fee</span>
                      <span>+₹20</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-3 font-semibold flex justify-between">
                  <span>Total</span>
                  <span>₹{paymentMethod === 'cod' ? cartTotal + 20 : cartTotal}</span>
                </div>
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="bg-white rounded-lg border p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Check className="h-5 w-5 text-theme-purple" />
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">100% SECURE PAYMENT</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">EASY RETURNS & INSTANT REFUNDS</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">100% GENUINE PRODUCT</p>
                </div>
              </div>
              
              <p className="mt-4 text-center text-sm text-gray-500">We accept</p>
              <div className="flex justify-center gap-4 mt-2">
                <img src="https://cdn-icons-png.flaticon.com/512/5977/5977576.png" alt="Google Pay" className="h-6 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/825/825454.png" alt="UPI" className="h-6 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196607.png" alt="PhonePe" className="h-6 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
