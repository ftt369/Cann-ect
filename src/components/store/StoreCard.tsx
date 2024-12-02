import { Store } from '../../types';
import Card from '../ui/Card';
import { StarIcon } from '@heroicons/react/20/solid';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <img
        src={store.imageUrl}
        alt={store.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{store.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{store.description}</p>
        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{store.rating}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{store.address}</p>
      </div>
    </Card>
  );
}