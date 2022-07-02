export interface CartItem {
  _id: string;
  shoppingCart_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  total: number;
  imageList: string[];
}

export interface CartResponse {
  shoppingCart: {
    _id: string;
    cus_id: string;
    status: boolean;
  };
  listShoppingCartDetail: CartItem[];
}

export interface PostCartItemRequest {
  cus_id: string;
  product_id?: string;
  quantity: number;
}

export interface PutCartItemResponse {
  message: string;
}

export interface PutCartItemRequest {
  carts: {
    product_id: string;
    quantity: number;
  }[];
}

export interface DeleteCartRequest {
  product_id?: string;
}

export interface DeleteCartResponse {
  msg: string;
}
