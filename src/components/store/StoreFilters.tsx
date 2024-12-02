import { useState } from 'react';
import Button from '../ui/Button';

interface StoreFiltersProps {
  onFilterChange: (filters: { category?: string; sortBy?: 'rating' | 'name' }) => void;
}

const CATEGORIES = [
  'All',
  'Dispensary',
  'Delivery',
  'CBD',
  'Accessories'
];

export default function StoreFilters({ onFilterChange }: StoreFiltersProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSortBy, setActiveSortBy] = useState<'rating' | 'name'>('rating');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilterChange({ 
      category: category === 'All' ? undefined : category,
      sortBy: activeSortBy 
    });
  };

  const handleSortChange = (sortBy: 'rating' | 'name') => {
    setActiveSortBy(sortBy);
    onFilterChange({ 
      category: activeCategory === 'All' ? undefined : activeCategory,
      sortBy 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant={activeSortBy === 'rating' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('rating')}
            className="justify-start"
          >
            Top Rated
          </Button>
          <Button
            variant={activeSortBy === 'name' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('name')}
            className="justify-start"
          >
            Alphabetical
          </Button>
        </div>
      </div>
    </div>
  );
}