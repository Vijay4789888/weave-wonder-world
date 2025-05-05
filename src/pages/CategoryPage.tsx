
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams();
  const products = category ? getProductsByCategory(category) : [];
  
  // In a real app, these would be state variables and we'd have filtering/sorting logic
  const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Popular"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Black", "White", "Blue", "Red", "Green"];
  
  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">{categoryTitle}</h1>
            <p className="text-gray-600 text-center">
              Discover our collection of stylish {categoryTitle.toLowerCase()} for every occasion
            </p>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="container mx-auto px-4 py-10">
          {/* Filters & Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <Button
              variant="outline"
              className="md:hidden w-full flex items-center justify-between"
            >
              <span className="flex items-center"><SlidersHorizontal size={16} className="mr-2" /> Filters</span>
              <ChevronDown size={16} />
            </Button>
            
            <div className="hidden md:flex items-center gap-6">
              <div>
                <span className="text-sm text-gray-500 mr-2">Price Range:</span>
                <Slider
                  defaultValue={[0, 100]}
                  max={300}
                  step={1}
                  className="w-[200px]"
                />
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mr-2">Size:</span>
                <div className="inline-flex gap-2">
                  {sizes.slice(0, 3).map(size => (
                    <div key={size} className="border rounded-md px-2 py-1 text-xs cursor-pointer hover:border-theme-purple hover:text-theme-purple">
                      {size}
                    </div>
                  ))}
                  <div className="border rounded-md px-2 py-1 text-xs cursor-pointer hover:border-theme-purple hover:text-theme-purple">
                    +{sizes.length - 3}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Desktop - Products with sidebar */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="border rounded-lg p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <Slider
                    defaultValue={[0, 100]}
                    max={300}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">$0</span>
                    <span className="text-sm text-gray-500">$300</span>
                  </div>
                </div>
                
                {/* Size */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <div
                        key={size}
                        className="border rounded-md px-3 py-1 text-sm cursor-pointer hover:border-theme-purple hover:text-theme-purple transition-colors"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Color */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                      <div key={color} className="flex items-center gap-2">
                        <Checkbox id={`color-${color}`} />
                        <Label htmlFor={`color-${color}`} className="text-sm">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Apply Filters Button */}
                <Button className="w-full bg-theme-purple hover:bg-theme-darkPurple">
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters or check back later!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
