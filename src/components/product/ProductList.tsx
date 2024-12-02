import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import { useCart } from '../../contexts/CartContext';

interface ProductListProps {
  storeId?: string;
  category?: string;
  searchQuery?: string;
  sortBy?: 'price' | 'name';
}

export default function ProductList({
  storeId,
  category,
  searchQuery,
  sortBy
}: ProductListProps) {
  const { products, loading, error } = useProducts({
    storeId,
    category,
    searchQuery,
    sortBy
  });
  const { dispatch } = useCart();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(product) => dispatch({ type: 'ADD_ITEM', payload: product })}
        />
      ))}
    </div>
  );
}