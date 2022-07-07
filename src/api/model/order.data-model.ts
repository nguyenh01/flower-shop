export interface OrderResponse {
  msg: string;
}

interface ProductItem {
  id: string;
  quantity: number;
  name?: string;
}

export interface OrderRequest {
  item: ProductItem[];
  to_district_id?: number;
  to_ward_code?: number;
  note?: string;
  phone: string;
  address: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface OrderFormik {
  email: string;
  lastName: string;
  firstName: string;
  phone: string;
  province?: number;
  district?: number;
  ward?: number;
  note: string;
  address: string;
}
