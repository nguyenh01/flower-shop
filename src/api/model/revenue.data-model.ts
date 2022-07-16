export interface RevenueRequest {
  option?: string;
  selectedDate?: string;
}

export interface RevenueItem {
  _id: string;
  order_code: string;
  note: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  email: string;
  employee_id: string;
  order_date: string;
  ship_date: string;
  status: number;
  ship_fee: number;
  product_fee: number;
  total_fee: number;
  district_id: number;
  ward_code: string;
  full_address: string;
  __v: number;
  receive_date: string;
}

export interface RevenueResponse {
  result: RevenueItem[];
  total: number;
}
