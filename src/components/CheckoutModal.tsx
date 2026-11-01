import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { X, CheckCircle, MessageCircle, Truck, CreditCard, ShoppingBag } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    governorate: 'Cairo',
    notes: ''
  });

  if (!isOpen) return null;

  const governorates = [
    'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'Beheira', 'Fayoum',
    'Gharbia', 'Ismailia', 'Monufia', 'Minya', 'Qalyubia', 'New Valley', 'Suez',
    'Aswan', 'Assiut', 'Beni Suef', 'Port Said', 'Damietta', 'Sharkia', 'South Sinai',
    'Kafr El Sheikh', 'Matrouh', 'Luxor', 'Qena', 'North Sinai', 'Sohag'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    setStep('success');
  };

  const orderNumber = Math.floor(Math.random() * 900000) + 100000;
  const shipping = subtotal > 1500 ? 0 : 80;
  const total = subtotal + shipping;

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-brand-gray border border-brand-gray-light rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl border-t-4 border-t-brand-orange animate-slide-up">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 border border-green-500/30">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Order Placed!</h2>
            <p className="text-gray-400">Order #AH-{orderNumber} is being processed.</p>
          </div>

          <div className="bg-brand-black p-6 rounded-2xl border border-brand-gray-light text-left space-y-3">
            <h3 className="text-xs font-bold uppercase text-brand-orange tracking-widest border-b border-brand-gray-light pb-2">Delivery Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Recipient</span>
              <span className="text-white font-bold">{formData.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Phone</span>
              <span className="text-white font-bold">{formData.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Governorate</span>
              <span className="text-white font-bold">{formData.governorate}</span>
            </div>
            <div className="flex justify-between text-lg font-black border-t border-brand-gray-light pt-3 mt-2">
              <span className="text-white">Total Amount</span>
              <span className="text-brand-orange">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              Please share your order number on WhatsApp for faster confirmation and tracking.
            </p>
            <a
              href={`https://wa.me/201000000000?text=Hello%20The%20Anime%20House!%20My%20Order%20ID%20is%20AH-${orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5c] text-white font-black py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-green-500/20 uppercase text-xs tracking-wider"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirm via WhatsApp</span>
            </a>
            <button
              onClick={() => {
                clearCart();
                onClose();
                setStep('form');
              }}
              className="w-full bg-brand-gray-light hover:bg-brand-gray text-white font-bold py-4 rounded-xl transition-all uppercase text-xs tracking-wider"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-brand-gray border border-brand-gray-light rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-slide-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-brand-black/80 hover:bg-brand-orange text-white hover:text-black p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Order Summary (Visible on Desktop) */}
          <div className="lg:col-span-5 bg-brand-black p-8 border-r border-brand-gray-light">
            <div className="flex items-center space-x-2 mb-6">
              <ShoppingBag className="w-5 h-5 text-brand-orange" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Order Summary</h3>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-4 mb-6 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-brand-gray" />
                    <span className="absolute -top-2 -right-2 bg-brand-orange text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-black">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-500">{item.series}</p>
                    <p className="text-xs font-black text-brand-orange mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-brand-gray-light text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal</span>
                <span className="text-white font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping to Egypt</span>
                <span className="text-white font-bold">
                  {shipping === 0 ? <span className="text-green-400">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-black text-white pt-3 mt-3 border-t-2 border-brand-gray-light">
                <span>Total Amount</span>
                <span className="text-brand-orange">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span>Delivery across all Egypt in 2-5 days</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <CreditCard className="w-4 h-4 text-brand-orange" />
                <span>Cash on Delivery / InstaPay available</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-7 p-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Checkout Details</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Ahmed Mohamed"
                  className="w-full bg-brand-black border border-brand-gray-light text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-brand-black border border-brand-gray-light text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full bg-brand-black border border-brand-gray-light text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Governorate</label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleInputChange}
                  className="w-full bg-brand-black border border-brand-gray-light text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer"
                >
                  {governorates.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Shipping Address</label>
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Building No, Street, Landmark..."
                  className="w-full bg-brand-black border border-brand-gray-light text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange transition-all resize-none"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-orange-600 text-black font-black py-4 rounded-xl uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-brand-orange/20 transition-all active:scale-95"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Complete Order</span>
                </button>
                <p className="text-[10px] text-gray-500 text-center mt-3 uppercase font-bold">
                  By clicking, you agree to our terms and conditions.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
