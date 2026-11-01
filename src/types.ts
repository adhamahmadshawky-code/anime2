export type Category = 'All' | 'Figures' | 'Manga' | 'Plushies' | 'Posters' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  series: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  isLimited?: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: Category;
  search: string;
  sort: SortOption;
  minPrice: number;
  maxPrice: number;
}
