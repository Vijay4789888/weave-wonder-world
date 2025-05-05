
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ProductProps } from './ProductCard';

interface CartItemProps {
  item: ProductProps & { quantity: number; size?: string };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const { id, name, image, price, originalPrice, category, quantity, size } = item;

  const savings = originalPrice && originalPrice > price ? originalPrice - price : 0;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(id, newQuantity);
    }
  };

  return (
    <div className="p-4 flex items-center gap-4">
      <div className="w-20 h-20 flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        
        <div className="flex items-center gap-2">
          {size && (
            <div className="text-sm">
              <span className="mr-1">Size:</span>
              <span className="font-medium">{size}</span>
            </div>
          )}
          
          <div className="border rounded flex items-center h-7 ml-auto">
            <button 
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-2 text-sm">{quantity}</span>
            <button 
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center gap-2 justify-end">
          <span className="font-medium">₹{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
          )}
        </div>
        
        {savings > 0 && (
          <p className="text-xs text-green-600">You saved ₹{savings}</p>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 text-gray-500 hover:text-red-500 p-0 h-auto"
          onClick={() => removeFromCart(id)}
        >
          <X size={16} className="mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
