import { collection, getDocs, query, where, orderBy, limit, DocumentData } from 'firebase/firestore';
import { db } from './firebase';
import { Store } from '../types';
import { sampleStores } from './sampleData';

export async function getStores(options: {
  category?: string;
  searchQuery?: string;
  sortBy?: 'rating' | 'name';
  limit?: number;
} = {}): Promise<Store[]> {
  // For demo purposes, we'll use the sample data instead of Firebase
  let stores = [...sampleStores];

  if (options.category && options.category !== 'All') {
    stores = stores.filter(store => 
      store.categories.includes(options.category!)
    );
  }

  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    stores = stores.filter(store =>
      store.name.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query)
    );
  }

  if (options.sortBy) {
    stores.sort((a, b) => {
      if (options.sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  if (options.limit) {
    stores = stores.slice(0, options.limit);
  }

  return stores;
}