import { useState, useEffect } from 'react';
import { Store } from '../types';
import { getStores } from '../services/store';

export function useStores(options: {
  category?: string;
  searchQuery?: string;
  sortBy?: 'rating' | 'name';
  limit?: number;
} = {}) {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStores() {
      try {
        setLoading(true);
        const data = await getStores(options);
        setStores(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, [options.category, options.searchQuery, options.sortBy, options.limit]);

  return { stores, loading, error };
}