import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-brand-gray rounded-xl overflow-hidden border border-brand-gray-light product-card-shadow transition-all duration-300 flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-black cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-brand-orange text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
              Sale
            </span>
          )}
          {product.isLimited && (
            <span className="bg-amber-500 text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
              Limited
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-brand-black/90 hover:bg-brand-orange text-white hover:text-black font-bold py-2 px-4 rounded-lg backdrop-blur-sm transition-colors text-xs flex items-center justify-center space-x-2 border border-brand-gray-light"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-brand-orange">{product.series}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-gray-500">({product.reviews})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-bold text-white line-clamp-2 hover:text-brand-orange cursor-pointer transition-colors mb-2"
          >
            {product.name}
          </h3>
        </div>

        <div className="pt-3 border-t border-brand-gray-light flex items-center justify-between mt-2">
          <div>
            <div className="text-lg font-black text-white">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-brand-orange hover:bg-orange-600 text-black p-2.5 rounded-lg transition-transform active:scale-95 shadow-md shadow-brand-orange/20"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
