
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 md:pr-8">
            <span className="inline-block bg-white text-theme-purple px-4 py-1 rounded-full text-sm font-medium">
              Summer Collection 2025
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your <span className="text-theme-purple">Perfect Style</span> This Season
            </h1>
            <p className="text-lg text-gray-600">
              Elevate your wardrobe with our latest collection of trendy and comfortable clothing designed for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <Button asChild size="lg" className="bg-theme-purple hover:bg-theme-darkPurple text-white">
                <Link to="/category/new-arrivals">
                  Shop Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-theme-purple text-theme-purple hover:bg-theme-purple/10">
                <Link to="/collections">
                  Explore Collections
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=962&q=80"
                alt="Fashion model wearing latest collection" 
                className="rounded-lg shadow-xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">New Season</p>
                <p className="text-lg font-bold text-theme-purple">Up to 30% Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
