export interface CreateOrderResponse {
  msg: string;
}

interface ProductItem {
  id: string;
  quantity: number;
  name?: string;
}

export interface CreateOrderRequest {
  item: ProductItem[];
  to_district_id?: number;
  to_ward_code?: number;
  note?: string;
  phone: string;
  address: string;
  email: string;
  first_name: string;
  last_name: string;
  full_address: string;
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

export interface GetOrdersRequest {
  page?: number;
  size?: number;
  status?: number;
  sort?: string;
  direction?: string;
  is_paging?: boolean;
  order_code?: string;
}

export interface OrderItem {
  _id: string;
  note: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  email: string;
  employee_id: string;
  order_date: string;
  order_code: string;
  ship_date: string;
  status: number;
  ship_fee: number;
  product_fee: number;
  total_fee: number;
  district_id: number;
  ward_code: string;
  full_address: string;
  __v: number;
}

export interface GetOrderResponse {
  orderDetailInfo: {
    imageList: string[];
    name: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
  }[];
  orderInfo: OrderItem;
}

export interface GetOrdersResponse {
  data: {
    result: OrderItem[];
    page_size: number;
    total_element: number;
    total_page: number;
    page: number;
  };
}

export interface UpdateStatusRequest {
  id: string;
  status: number;
}
