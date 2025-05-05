
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import FeaturedCollection from '@/components/FeaturedCollection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { featuredProducts } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroBanner />
        <CategorySection />
        <ProductGrid products={featuredProducts} title="Featured Products" />
        <FeaturedCollection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
