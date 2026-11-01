import React from 'react';
import { ArrowRight, Sparkles, Flame, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <div className="relative overflow-hidden bg-brand-black py-12 md:py-20 border-b border-brand-gray-light">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      {/* Anime Japanese Typography Accent in background */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none opacity-5 pointer-events-none hidden lg:block text-white font-black text-9xl tracking-widest vertical-text">
        アニメハウス
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-gray border border-brand-orange/30 px-3 py-1.5 rounded-full text-xs font-bold text-brand-orange uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-brand-orange text-brand-orange" />
              <span>Egypt's #1 Otaku Destination</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
              UNLEASH YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
                INNER OTAKU
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Discover authentic anime figures, premium manga volumes, cozy plushies, and exclusive apparel delivered anywhere in Egypt with Cash on Delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-black font-black px-8 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-brand-orange/20 uppercase tracking-wider text-sm"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span>100% Guaranteed Authenticity</span>
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-gray-light max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-black text-white">500+</p>
                <p className="text-xs text-gray-400 font-bold uppercase">Anime Items</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">2-4 Days</p>
                <p className="text-xs text-gray-400 font-bold uppercase">Fast Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-gray-400 font-bold uppercase">Authentic</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Banner Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-orange/40 shadow-2xl bg-brand-gray group">
                <img
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800"
                  alt="Anime Figure Collection"
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-black/90 backdrop-blur-md border border-brand-gray-light p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider block">Featured Drop</span>
                    <h3 className="text-sm font-black text-white">Jujutsu Kaisen Scale Figures</h3>
                    <p className="text-xs text-gray-400">Starting from 2,100 EGP</p>
                  </div>
                  <div className="bg-brand-orange text-black font-black text-xs px-3 py-1.5 rounded-md uppercase">
                    New In
                  </div>
                </div>
              </div>

              {/* Floating Decorative Otaku Badge */}
              <div className="absolute -top-4 -right-4 bg-brand-black border border-brand-orange p-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-bounce">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-black text-white uppercase tracking-wider">Cairo & Giza Express</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
