import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { products } from './data/products';
import { Category, Product, SortOption } from './types';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'storefront' | 'dashboard'>('storefront');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.series.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortOption]);

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectCategoryFromHero = (cat: Category) => {
    setActiveCategory(cat);
    scrollToProducts();
  };

  if (viewMode === 'dashboard') {
    return (
      <CartProvider>
        <AdminDashboard onBackToStore={() => setViewMode('storefront')} />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenDashboard={() => setViewMode('dashboard')}
        />

        <main className="flex-grow">
          <Hero onShopClick={scrollToProducts} />

          <FeaturedCollections onSelectCategory={handleSelectCategoryFromHero} />

          <div id="products-section">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortOption={sortOption}
              onSortChange={setSortOption}
              productCount={filteredProducts.length}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 space-y-4">
                  <div className="w-20 h-20 bg-brand-gray border border-brand-gray-light rounded-full flex items-center justify-center mx-auto text-brand-orange">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">No products found</h3>
                  <p className="text-gray-400">We couldn't find anything matching "{searchQuery}" in {activeCategory}.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="bg-brand-orange text-black font-black px-6 py-3 rounded-xl uppercase text-xs tracking-widest mt-4"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Marketing Banner */}
          <section className="bg-brand-orange text-black py-16 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                  JOIN THE HOUSE <br /> & SAVE 10%
                </h2>
                <p className="text-black/80 font-bold max-w-sm uppercase text-xs tracking-wider">
                  Use code <span className="bg-black text-brand-orange px-2 py-0.5 rounded">OTAKU10</span> at checkout for your first order.
                </p>
              </div>
              <button
                onClick={scrollToProducts}
                className="bg-black text-brand-orange hover:bg-brand-gray-dark font-black px-10 py-5 rounded-2xl uppercase tracking-widest text-sm transition-all transform hover:scale-105 shadow-2xl"
              >
                Shop Now
              </button>
            </div>
            {/* Background Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-10">
              <span className="text-[150px] font-black uppercase tracking-tighter text-black whitespace-nowrap">ANIME HOUSE</span>
            </div>
          </section>
        </main>

        <Footer />

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />

        <WhatsAppButton />
      </div>
    </CartProvider>
  );
};

export default App;
