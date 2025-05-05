
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const productId = id ? parseInt(id) : 0;
  const product = getProductById(productId);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { name, price, originalPrice, image, category, colors } = product;
  
  const sizes = ["XS", "S", "M", "L", "XL"];
  
  const addToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    if (!selectedColor && colors && colors.length > 0) {
      toast.error("Please select a color");
      return;
    }
    
    toast.success(`${name} added to your cart!`);
    // In a real app, we would add the product to the cart here
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm">
            <a href="/" className="text-gray-500 hover:text-theme-purple">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href={`/category/${category.toLowerCase()}`} className="text-gray-500 hover:text-theme-purple">{category}</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{name}</span>
          </div>
          
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Product Images */}
            <div className="sticky top-24">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{name}</h1>
              <p className="text-gray-500 mb-4">{category}</p>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
                {originalPrice && originalPrice > price && (
                  <>
                    <span className="ml-3 text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                    <span className="ml-3 bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded-md">
                      {Math.round((1 - price / originalPrice) * 100)}% off
                    </span>
                  </>
                )}
              </div>
              
              {/* Color Selection */}
              {colors && colors.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-medium text-gray-800 mb-3">Color</h2>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 flex items-center justify-center",
                          selectedColor === color ? "border-theme-purple" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      >
                        {selectedColor === color && (
                          <Check size={16} className="text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-medium text-gray-800">Size</h2>
                  <Button variant="link" className="text-theme-purple p-0 h-auto text-sm">Size Guide</Button>
                </div>
                
                <RadioGroup 
                  value={selectedSize || ""} 
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-3"
                >
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem 
                        value={size} 
                        id={`size-${size}`}
                        className="hidden"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className={cn(
                          "h-10 w-10 rounded-md border flex items-center justify-center cursor-pointer transition-all",
                          selectedSize === size
                            ? "border-theme-purple bg-theme-purple/10 text-theme-purple font-medium"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h2 className="font-medium text-gray-800 mb-3">Quantity</h2>
                <div className="flex items-center border rounded-md w-32">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-300"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button 
                  onClick={addToCart}
                  className="bg-theme-purple hover:bg-theme-darkPurple text-white flex-1"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="border-gray-300">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Description & Details */}
              <Tabs defaultValue="description">
                <TabsList className="w-full border-b mb-0 rounded-none bg-transparent p-0 h-auto">
                  <TabsTrigger 
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-theme-purple data-[state=active]:bg-transparent text-gray-700 data-[state=active]:text-gray-900 h-10"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-theme-purple data-[state=active]:bg-transparent text-gray-700 data-[state=active]:text-gray-900 h-10"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shipping"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-theme-purple data-[state=active]:bg-transparent text-gray-700 data-[state=active]:text-gray-900 h-10"
                  >
                    Shipping & Returns
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="pt-4">
                  <p className="text-gray-600">
                    This premium {name.toLowerCase()} is designed with both style and comfort in mind. 
                    The high-quality materials ensure durability while maintaining a fashionable look that's perfect for any occasion.
                    Whether you're dressing up for a night out or keeping it casual during the day, this versatile piece will become
                    a staple in your wardrobe.
                  </p>
                </TabsContent>
                
                <TabsContent value="details" className="pt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>High-quality fabric composition</li>
                    <li>Comfortable fit</li>
                    <li>Machine washable</li>
                    <li>Imported</li>
                    <li>Model is wearing size M</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="shipping" className="pt-4">
                  <div className="text-gray-600">
                    <p className="mb-3">
                      <strong>Shipping:</strong> Free standard shipping on orders over $50. Express delivery available.
                    </p>
                    <p>
                      <strong>Returns:</strong> Easy returns within 30 days of purchase. Items must be unworn with original tags attached.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
