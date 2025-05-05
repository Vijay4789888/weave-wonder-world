
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ProductProps } from '@/components/ProductCard';
import { toast } from '@/components/ui/sonner';

interface CartItem extends ProductProps {
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductProps, quantity?: number, size?: string) => void;
  removeFromCart: (id: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartSavings: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartSubtotal: 0,
  cartSavings: 0,
  itemCount: 0
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartSavings, setCartSavings] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  
  useEffect(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    // Calculate totals
    let total = 0;
    let subtotal = 0;
    let savings = 0;
    let count = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      if (item.originalPrice && item.originalPrice > item.price) {
        subtotal += item.originalPrice * item.quantity;
        savings += (item.originalPrice - item.price) * item.quantity;
      } else {
        subtotal += itemTotal;
      }
      
      count += item.quantity;
    });
    
    setCartTotal(total);
    setCartSubtotal(subtotal);
    setCartSavings(savings);
    setItemCount(count);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: ProductProps, quantity = 1, size?: string) => {
    setCart(currentCart => {
      // Check if product is already in cart with same size
      const existingItemIndex = currentCart.findIndex(
        item => item.id === product.id && item.size === size
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const newCart = [...currentCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity
        };
        toast.success(`Updated ${product.name} quantity in your cart!`);
        return newCart;
      } else {
        // Add new item to cart
        toast.success(`${product.name} added to your cart!`);
        return [...currentCart, { ...product, quantity, size }];
      }
    });
  };
  
  const removeFromCart = (id: number) => {
    setCart(currentCart => {
      const itemToRemove = currentCart.find(item => item.id === id);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from your cart!`);
      }
      return currentCart.filter(item => item.id !== id);
    });
  };
  
  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCart(currentCart => 
      currentCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    toast.success("Your cart has been cleared!");
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateCartItemQuantity, 
        clearCart, 
        cartTotal, 
        cartSubtotal, 
        cartSavings,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
