export interface User {
  id: string;
  email: string;
  username: string;
  region: string;
  profileImage?: string;
  createdAt: string;
}

export interface Cat {
  id: string;
  userId: string;
  name: string;
  age: number;
  personality: CatPersonality[];
  preferredCategories: ToyCategory[];
  image?: string;
  description?: string;
}

export type CatPersonality =
  | "활동적"
  | "소심"
  | "호기심많음"
  | "게으름"
  | "사교적"
  | "예민함";
export type ToyCategory =
  | "낚싯대"
  | "공"
  | "숨숨집"
  | "터널"
  | "스크래처"
  | "쥐/인형"
  | "기타";
export type ProductCondition = "A" | "B" | "C";
export type TradeMethod = "직거래" | "택배" | "직거래+택배";

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  category: ToyCategory;
  originalPrice: number;
  sellingPrice: number;
  condition: ProductCondition;
  usageDuration: string; // "1개월", "3개월" 등
  description: string;
  images: string[];
  tradeRegion: string;
  tradeMethod: TradeMethod[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// export interface Wishlist {
//   id: string;
//   userId: string;
//   productId: string;
//   createdAt: string;
// }

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
