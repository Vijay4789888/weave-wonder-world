
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FeaturedCollection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Collection */}
          <div className="relative rounded-lg overflow-hidden group h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
              alt="Summer Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-bold mb-2">Summer Collection</h3>
              <p className="text-gray-200 mb-4">Light fabrics for the warm days</p>
              <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 w-fit">
                <Link to="/collection/summer">Explore</Link>
              </Button>
            </div>
          </div>
          
          {/* Second Collection */}
          <div className="relative rounded-lg overflow-hidden group h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=962&q=80"
              alt="Weekend Essentials"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-bold mb-2">Weekend Essentials</h3>
              <p className="text-gray-200 mb-4">Comfortable styles for your days off</p>
              <Button asChild className="bg-white text-gray-900 hover:bg-gray-100 w-fit">
                <Link to="/collection/weekend">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
