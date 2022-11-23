export interface ProductsApi {
  name: string;
  category: string;
  price: number;
  image: string;
  id: number;
  qty: number;
}

export interface categories {
  category: string;
  id: number;
}

export interface ProductsRequest {
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface categoriesResponse {
  category: string;
}
