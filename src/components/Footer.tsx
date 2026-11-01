import React from 'react';
import { Send, Globe, Mail, Phone, MapPin, Share2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black pt-16 pb-8 border-t border-brand-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-brand-orange p-1.5 rounded-md mr-2">
                <span className="text-black font-black text-xl italic">AH</span>
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-white">
                THE ANIME <span className="text-brand-orange">HOUSE</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Egypt's premier destination for high-quality anime merchandise. We bring you authentic figures, manga, and gear directly to your doorstep.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="bg-brand-gray p-2.5 rounded-xl border border-brand-gray-light hover:border-brand-orange transition-colors text-white flex items-center justify-center">
                <Globe className="w-5 h-5 text-brand-orange" />
              </a>
              <a href="#" className="bg-brand-gray p-2.5 rounded-xl border border-brand-gray-light hover:border-brand-orange transition-colors text-white flex items-center justify-center">
                <Share2 className="w-5 h-5 text-brand-orange" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-l-2 border-brand-orange pl-3">
              Shop Collections
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Action Figures</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Manga Library</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Apparel & Gear</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Limited Edition Drops</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-l-2 border-brand-orange pl-3">
              Support & Info
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Shipping Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Wholesale Program</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-l-2 border-brand-orange pl-3">
              Stay Updated
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-gray-400">Cairo Festival City, New Cairo, Egypt</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-gray-400">+20 100 000 0000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-gray-400">support@animehouse.eg</span>
              </div>
              <form className="relative pt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-brand-gray border border-brand-gray-light text-white pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-brand-orange text-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-[17px] mt-4 bg-brand-orange text-black p-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-brand-gray-light flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
          <p>© 2026 THE ANIME HOUSE EGYPT. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 italic">
            <span>Powered by Otaku Spirit</span>
            <span>Hand-crafted in Cairo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
