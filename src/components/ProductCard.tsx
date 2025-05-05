
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  colors?: string[];
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, name, price, originalPrice, image, category, isNew, isSale, discount, colors
}) => {
  return (
    <div className="product-card group rounded-lg overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="badge-new bg-theme-purple text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
          {isSale && discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </div>
        
        {/* Wishlist button */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-3 right-3 bg-white/80 hover:bg-white border-none h-8 w-8 rounded-full"
        >
          <Heart size={16} className="text-gray-600 hover:text-theme-purple" />
        </Button>
        
        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 bg-theme-purple text-white py-2 px-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-center">
          <span className="text-sm font-medium">Quick Add</span>
          <span className="text-sm">+</span>
        </div>
      </div>
      
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 mb-1">{category}</p>
        
        {/* Title */}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-800 hover:text-theme-purple transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
          
          {originalPrice && originalPrice > price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Color variants */}
        {colors && colors.length > 0 && (
          <div className="mt-3 flex gap-1">
            {colors.map((color, index) => (
              <div 
                key={index}
                className={cn(
                  "h-4 w-4 rounded-full border border-gray-200",
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
