import { Product } from '../types';

export const products: Product[] = [
  // Figures
  {
    id: 'fig-1',
    name: 'Gojo Satoru (Limitless) - ArtFX J',
    series: 'Jujutsu Kaisen',
    price: 3450,
    originalPrice: 4200,
    category: 'Figures',
    image: 'https://images.unsplash.com/photo-1635324223594-55cc0d68f760?auto=format&fit=crop&q=80&w=800',
    description: 'A stunning 1/8 scale figure of Gojo Satoru featuring his iconic Limitless technique. Exquisite detail on the base and uniform.',
    rating: 4.9,
    reviews: 124,
    isNew: true,
    isLimited: true,
    stock: 5
  },
  {
    id: 'fig-2',
    name: 'Roronoa Zoro (King of Artist)',
    series: 'One Piece',
    price: 1850,
    category: 'Figures',
    image: 'https://images.unsplash.com/photo-1613310022764-6b2561ee598e?auto=format&fit=crop&q=80&w=800',
    description: 'Banpresto King of Artist collection. Roronoa Zoro in his Wano Country outfit with triple katanas.',
    rating: 4.8,
    reviews: 86,
    stock: 12
  },
  {
    id: 'fig-3',
    name: 'Zenitsu Agatsuma (Thunder Breathing)',
    series: 'Demon Slayer',
    price: 2100,
    category: 'Figures',
    image: 'https://images.unsplash.com/photo-1614583225154-5feaba1bd5dd?auto=format&fit=crop&q=80&w=800',
    description: 'Dynamic pose figure capturing Zenitsu performing his First Form: Thunderclap and Flash.',
    rating: 4.7,
    reviews: 54,
    isSale: true,
    stock: 8
  },

  // Manga
  {
    id: 'mng-1',
    name: 'Berserk Deluxe Edition Vol. 1',
    series: 'Berserk',
    price: 1250,
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1618519764620-7403abdb09cc?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate way to experience Berserk. Hardcover deluxe edition featuring larger pages and high-quality paper.',
    rating: 5.0,
    reviews: 215,
    isNew: false,
    stock: 20
  },
  {
    id: 'mng-2',
    name: 'Junji Ito: Uzumaki (Hardcover)',
    series: 'Horror Collection',
    price: 750,
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=800',
    description: 'A masterpiece of horror manga by Junji Ito. Complete story collected in a premium hardcover format.',
    rating: 4.9,
    reviews: 98,
    stock: 15
  },

  // Plushies
  {
    id: 'pls-1',
    name: 'Pochita Large Plush',
    series: 'Chainsaw Man',
    price: 650,
    category: 'Plushies',
    image: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?auto=format&fit=crop&q=80&w=800',
    description: 'Soft and huggable Pochita plushie. Perfect for Chainsaw Man fans.',
    rating: 4.9,
    reviews: 42,
    isNew: true,
    stock: 25
  },
  {
    id: 'pls-2',
    name: 'Spy x Family: Anya Forger Chimera',
    series: 'Spy x Family',
    price: 480,
    category: 'Plushies',
    image: 'https://images.unsplash.com/photo-1559445375-a385615bb939?auto=format&fit=crop&q=80&w=800',
    description: "Official Chimera plushie, Anya's favorite toy from the hit series Spy x Family.",
    rating: 4.8,
    reviews: 31,
    stock: 10
  },

  // Posters
  {
    id: 'pst-1',
    name: 'Attack on Titan Season 4 Wall Scroll',
    series: 'Attack on Titan',
    price: 380,
    category: 'Posters',
    image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&q=80&w=800',
    description: 'Large high-definition wall scroll featuring Eren Yeager and the Survey Corps.',
    rating: 4.6,
    reviews: 19,
    stock: 40
  },

  // Accessories
  {
    id: 'acc-1',
    name: 'Akatsuki Cloud Embroidered Hoodie',
    series: 'Naruto',
    price: 950,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800',
    description: 'Premium quality black hoodie with embroidered Akatsuki red clouds. Heavyweight cotton blend.',
    rating: 4.8,
    reviews: 67,
    stock: 22
  },
  {
    id: 'acc-2',
    name: 'Survey Corps Metal Keychain',
    series: 'Attack on Titan',
    price: 120,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=800',
    description: 'Highly detailed metal keychain of the Wings of Freedom emblem.',
    rating: 4.5,
    reviews: 156,
    stock: 100
  }
];

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('EGP', '').trim() + ' EGP';
};

export const formatPriceArabic = (amount: number) => {
  return amount.toLocaleString('ar-EG') + ' ج.م';
};
