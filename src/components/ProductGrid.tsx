
import React from 'react';
import ProductCard, { ProductProps } from './ProductCard';

interface ProductGridProps {
  products: ProductProps[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {title && (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <div className="h-1 w-20 bg-theme-purple mt-2"></div>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
