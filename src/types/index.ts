export interface Store {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  address: string;
  categories: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  storeId: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  preferences?: {
    favoriteStores: string[];
    favoriteProducts: string[];
  };
}