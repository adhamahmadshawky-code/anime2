import React from 'react';
import { Category, SortOption } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  productCount,
}) => {
  const categories: Category[] = ['All', 'Figures', 'Manga', 'Plushies', 'Posters', 'Accessories'];

  return (
    <div className="bg-brand-black border-b border-brand-gray-light py-6 sticky top-20 z-30 backdrop-blur-md bg-brand-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-brand-orange text-black shadow-lg shadow-brand-orange/20'
                    : 'bg-brand-gray text-gray-400 hover:text-white border border-brand-gray-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count & Sorting */}
          <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 border-brand-gray-light pt-3 md:pt-0">
            <span className="text-xs text-gray-400 font-bold uppercase">
              Showing <span className="text-brand-orange font-black">{productCount}</span> Items
            </span>

            <div className="flex items-center space-x-2 bg-brand-gray border border-brand-gray-light rounded-xl px-3 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-orange" />
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer uppercase"
              >
                <option value="featured" className="bg-brand-black">Featured</option>
                <option value="price-asc" className="bg-brand-black">Price: Low to High</option>
                <option value="price-desc" className="bg-brand-black">Price: High to Low</option>
                <option value="rating" className="bg-brand-black">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
