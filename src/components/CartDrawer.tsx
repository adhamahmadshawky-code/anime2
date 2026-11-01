import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'OTAKU10') {
      setDiscount(0.1);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try OTAKU10');
    }
  };

  const discountAmount = subtotal * discount;
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 80; // 80 EGP standard shipping in Egypt
  const finalTotal = subtotal - discountAmount + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-brand-gray border-l border-brand-gray-light h-full flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-brand-gray-light flex items-center justify-between bg-brand-black">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-brand-orange" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">Your Cart</h2>
            <span className="bg-brand-orange text-black font-black text-xs px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mx-auto text-brand-orange border border-brand-gray-light">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-white">Your cart is empty</h3>
              <p className="text-sm text-gray-400">Explore our collections and add your favorite anime gear!</p>
              <button
                onClick={onClose}
                className="mt-4 bg-brand-orange text-black font-black px-6 py-3 rounded-xl uppercase text-xs tracking-wider"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-brand-black p-4 rounded-xl border border-brand-gray-light flex space-x-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-brand-gray"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-brand-orange">{item.series}</span>
                  <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                  <div className="text-sm font-black text-white mt-1">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 bg-brand-gray border border-brand-gray-light rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-brand-black border-t border-brand-gray-light space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo Code (OTAKU10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full bg-brand-gray border border-brand-gray-light text-white pl-9 pr-3 py-2 rounded-lg text-xs uppercase focus:outline-none focus:border-brand-orange"
                  />
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied}
                  className="bg-brand-gray hover:bg-brand-gray-light text-white px-4 py-2 rounded-lg text-xs font-bold uppercase border border-brand-gray-light transition-colors disabled:opacity-50"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoError && <p className="text-[10px] text-red-500 font-semibold">{promoError}</p>}
              {promoApplied && <p className="text-[10px] text-green-400 font-semibold">10% discount applied successfully!</p>}
            </form>

            <div className="space-y-2 text-sm text-gray-400 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-400">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping (Egypt)</span>
                <span className="font-bold text-white">
                  {shipping === 0 ? <span className="text-green-400">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              {subtotal > 0 && subtotal < 1500 && (
                <p className="text-[10px] text-brand-orange">
                  Add {formatPrice(1500 - subtotal)} more for FREE shipping!
                </p>
              )}
              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-brand-gray-light">
                <span>Total</span>
                <span className="text-brand-orange text-xl">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-brand-orange hover:bg-orange-600 text-black font-black py-4 rounded-xl uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange/20 transition-transform active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
