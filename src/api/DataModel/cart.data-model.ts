export interface CartItem {
  _id: string;
  shoppingCart_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  total: number;
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
