import React from 'react';
import { Category } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: Category) => void;
}

const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCategory }) => {
  const collections = [
    {
      title: 'Anime Figures & Statues',
      category: 'Figures' as Category,
      image: 'https://images.unsplash.com/photo-1635324223594-55cc0d68f760?auto=format&fit=crop&q=80&w=600',
      tag: 'Most Popular',
      description: 'Scaled, Nendoroid & Prize Figures'
    },
    {
      title: 'Manga & Light Novels',
      category: 'Manga' as Category,
      image: 'https://images.unsplash.com/photo-1618519764620-7403abdb09cc?auto=format&fit=crop&q=80&w=600',
      tag: 'Hardcover Editions',
      description: 'English & Deluxe Collector Manga'
    },
    {
      title: 'Soft Plushies & Toys',
      category: 'Plushies' as Category,
      image: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?auto=format&fit=crop&q=80&w=600',
      tag: 'Super Soft',
      description: 'Chainsaw Man, Spy x Family & More'
    },
    {
      title: 'Apparel & Gear',
      category: 'Accessories' as Category,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=600',
      tag: 'Exclusive',
      description: 'Hoodies, Keychains & Accessories'
    }
  ];

  return (
    <section className="py-16 bg-brand-black border-b border-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-brand-orange text-xs font-black uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Featured Collections
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.category}
              onClick={() => onSelectCategory(col.category)}
              className="group relative rounded-2xl overflow-hidden bg-brand-gray border border-brand-gray-light cursor-pointer h-80 transition-all duration-300 hover:border-brand-orange/50 hover:shadow-xl hover:shadow-brand-orange/10"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="bg-brand-orange text-black font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {col.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <h3 className="text-xl font-black text-white group-hover:text-brand-orange transition-colors uppercase leading-tight">
                  {col.title}
                </h3>
                <p className="text-xs text-gray-400">{col.description}</p>
                <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
