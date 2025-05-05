
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="bg-theme-purple py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-purple-100 mb-6">
            Stay updated with the latest trends, exclusive discounts, and new arrivals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white text-gray-900 border-0"
            />
            <Button 
              className="bg-white text-theme-purple hover:bg-gray-100"
            >
              Subscribe
            </Button>
          </div>
          
          <p className="text-purple-200 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
