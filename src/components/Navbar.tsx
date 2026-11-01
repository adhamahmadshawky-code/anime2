import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, MessageCircle, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Category } from '../types';

interface NavbarProps {
  onCategoryChange: (category: Category) => void;
  activeCategory: Category;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenDashboard: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onCategoryChange,
  activeCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenDashboard,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const categories: Category[] = ['All', 'Figures', 'Manga', 'Plushies', 'Posters', 'Accessories'];

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-black/90 backdrop-blur-md border-b border-brand-gray-light">
      {/* Top Banner with direct Dashboard Link */}
      <div className="bg-brand-orange text-black py-1.5 px-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between">
        <span className="hidden sm:inline">⚡ FREE SHIPPING ON ORDERS OVER 1,500 EGP | CASH ON DELIVERY 🇪🇬</span>
        <span className="sm:hidden text-center w-full">⚡ FREE SHIPPING OVER 1,500 EGP</span>
        <button
          onClick={onOpenDashboard}
          className="hidden md:inline-flex items-center space-x-1.5 bg-black text-brand-orange px-3 py-0.5 rounded-full text-[10px] font-black uppercase hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
        >
          <LayoutDashboard className="w-3 h-3" />
          <span>Store Dashboard</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onCategoryChange('All')}>
            <div className="bg-brand-orange p-1.5 rounded-md mr-2">
              <span className="text-black font-black text-xl italic">AH</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white hidden sm:block">
              THE ANIME <span className="text-brand-orange">HOUSE</span>
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search your favorite anime..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-brand-gray border border-brand-gray-light text-white pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-brand-orange transition-all text-sm"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={onOpenDashboard}
              className="flex items-center space-x-1.5 text-xs font-black uppercase text-brand-orange bg-brand-gray border border-brand-gray-light hover:border-brand-orange px-3 py-2 rounded-xl transition-all"
              title="Open Store Owner Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button className="text-gray-300 hover:text-brand-orange transition-colors relative">
              <Heart className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenCart}
              className="text-white hover:text-brand-orange transition-colors relative p-1"
            >
              <ShoppingCart className="w-7 h-7" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenDashboard}
              className="p-1.5 bg-brand-gray rounded-lg text-brand-orange border border-brand-gray-light"
              title="Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenCart}
              className="text-white relative p-1"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Categories */}
      <div className="hidden md:block bg-brand-black border-t border-brand-gray-light">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex items-center space-x-8 h-12">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onCategoryChange(cat)}
                  className={`text-sm font-bold tracking-wide uppercase transition-all relative py-1 ${
                    activeCategory === cat ? 'text-brand-orange' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange rounded-full"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-black border-t border-brand-gray-light animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-brand-gray border border-brand-gray-light text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Mobile Categories */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoryChange(cat);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                    activeCategory === cat ? 'bg-brand-orange text-black' : 'bg-brand-gray text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex justify-around pt-4 border-t border-brand-gray-light">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenDashboard();
                }}
                className="flex flex-col items-center text-brand-orange"
              >
                <LayoutDashboard className="w-6 h-6 mb-1" />
                <span className="text-[10px] uppercase font-bold">Dashboard</span>
              </button>
              <button className="flex flex-col items-center text-gray-400">
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-[10px] uppercase font-bold">Wishlist</span>
              </button>
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-[#25D366]"
              >
                <MessageCircle className="w-6 h-6 mb-1" />
                <span className="text-[10px] uppercase font-bold">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
