
import { ProductProps } from "@/components/ProductCard";

export const products: ProductProps[] = [
  {
    id: 1,
    name: "Classic Fit Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
    category: "Men",
    colors: ["#000000", "#FFFFFF", "#C0C0C0"],
    isNew: true
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Men",
    colors: ["#000080", "#000000", "#1560BD"],
  },
  {
    id: 3,
    name: "Casual Button-Down Shirt",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1602810317536-4d5f108b2c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Men",
    isSale: true,
    discount: 20,
    colors: ["#FFFFFF", "#87CEEB", "#FFC0CB"],
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=746&q=80",
    category: "Women",
    isNew: true,
    colors: ["#FFC0CB", "#FFD700", "#000000"],
  },
  {
    id: 5,
    name: "High-Waisted Skinny Jeans",
    price: 54.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Women",
    isSale: true,
    discount: 20,
    colors: ["#000000", "#1560BD", "#FFFFFF"],
  },
  {
    id: 6,
    name: "Oversized Knit Sweater",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    category: "Women",
    colors: ["#F5F5DC", "#C0C0C0", "#000000"],
  },
  {
    id: 7,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    category: "Accessories",
    isNew: true,
    colors: ["#8B4513", "#000000", "#F5F5DC"],
  },
  {
    id: 8,
    name: "Stainless Steel Watch",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
    category: "Accessories",
    isSale: true,
    discount: 20,
    colors: ["#C0C0C0", "#FFD700"],
  },
];

export const featuredProducts = products.filter(product => product.isNew || product.isSale);

export const newArrivals = products.filter(product => product.isNew);

export const saleProducts = products.filter(product => product.isSale);

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};
