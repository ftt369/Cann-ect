import { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts } from '../services/product';

export function useProducts(options: {
  category?: string;
  storeId?: string;
  searchQuery?: string;
  sortBy?: 'price' | 'name';
  limit?: number;
} = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts(options);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options.category, options.storeId, options.searchQuery, options.sortBy, options.limit]);

  return { products, loading, error };
}