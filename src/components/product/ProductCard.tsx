import { Product } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <span className="text-sm text-green-600 font-medium">{product.category}</span>
        <h3 className="font-bold text-lg mt-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}