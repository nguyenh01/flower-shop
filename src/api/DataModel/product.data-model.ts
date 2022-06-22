export interface ProductItem {
  _id: string;
  cate_id: string;
  name: string;
  price: number;
  unitsinstock: number;
  imageList: string[];
  description: string;
}

export interface ProductResponse {
  data: {
    page_size: number;
    total_element: number;
    total_page: number;
    page: number;
    result: ProductItem[];
  };
}

export interface ProductRequest {
  page?: number;
  size?: number;
  cate_id?: string[];
  mate_id?: string[];
  name?: string;
  order_by?: string;
  is_instock?: boolean[];
}
