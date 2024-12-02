import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '../types';
import { sampleProducts } from './sampleData';

export async function getProducts(options: {
  category?: string;
  storeId?: string;
  searchQuery?: string;
  sortBy?: 'price' | 'name';
  limit?: number;
} = {}): Promise<Product[]> {
  // For demo purposes, we'll use the sample data instead of Firebase
  let products = [...sampleProducts];

  if (options.category) {
    products = products.filter(product => 
      product.category === options.category
    );
  }

  if (options.storeId) {
    products = products.filter(product => 
      product.storeId === options.storeId
    );
  }

  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    products = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  if (options.sortBy) {
    products.sort((a, b) => {
      if (options.sortBy === 'price') {
        return a.price - b.price;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  if (options.limit) {
    products = products.slice(0, options.limit);
  }

  return products;
}