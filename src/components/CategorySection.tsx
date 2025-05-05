
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  link: string;
}

const categories: CategoryProps[] = [
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
    link: '/category/men'
  },
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1618244972963-dbad96a20dce?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
    link: '/category/women'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80',
    link: '/category/accessories'
  },
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore our curated collections and find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={category.link} key={category.id} className="group">
              <div className="overflow-hidden rounded-lg relative h-[350px]">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end p-6">
                  <div className="bg-white py-3 px-6 rounded-lg">
                    <h3 className="font-medium text-lg text-gray-800">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
