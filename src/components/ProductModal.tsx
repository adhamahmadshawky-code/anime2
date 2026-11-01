import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className="relative bg-brand-gray border border-brand-gray-light rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-brand-black/80 hover:bg-brand-orange text-white hover:text-black p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-brand-black aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isLimited && (
              <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3 py-1 rounded-md uppercase">
                Limited Edition
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-black px-3 py-1 rounded-full border border-brand-gray-light">
                  {product.series}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                {product.name}
              </h2>

              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-black text-brand-orange">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Stock status */}
              <div className="flex items-center space-x-2 text-xs text-green-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>In Stock ({product.stock} units available in Cairo warehouse)</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-brand-gray-light">
              {/* Quantity selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-400">Quantity</span>
                <div className="flex items-center space-x-3 bg-brand-black border border-brand-gray-light rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-brand-orange hover:bg-orange-600 text-black shadow-brand-orange/20'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-gray-400 uppercase font-bold">
                <div className="flex flex-col items-center space-y-1 bg-brand-black/50 p-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex flex-col items-center space-y-1 bg-brand-black/50 p-2 rounded-lg">
                  <Truck className="w-4 h-4 text-brand-orange" />
                  <span>COD Egypt</span>
                </div>
                <div className="flex flex-col items-center space-y-1 bg-brand-black/50 p-2 rounded-lg">
                  <RotateCcw className="w-4 h-4 text-brand-orange" />
                  <span>Easy Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
