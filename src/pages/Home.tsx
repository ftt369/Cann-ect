import { useState } from 'react';
import SearchBar from '../components/layout/SearchBar';
import StoreList from '../components/store/StoreList';
import StoreFilters from '../components/store/StoreFilters';
import CartDrawer from '../components/cart/CartDrawer';
import { useCart } from '../contexts/CartContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState<{
    category?: string;
    sortBy?: 'rating' | 'name';
  }>({});
  const { state: { items } } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1 max-w-2xl">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search stores by name or location..."
          />
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="ml-4 relative p-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <StoreFilters onFilterChange={setFilters} />
        </aside>

        <main className="lg:col-span-3">
          <StoreList
            searchQuery={searchQuery}
            category={filters.category}
            sortBy={filters.sortBy}
          />
        </main>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}