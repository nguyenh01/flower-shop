export interface Material {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface MaterialsRequest {
  name?: string;
  is_paging?: boolean;
}

export interface MaterialsResponse {
  data: {
    result: Material[];
    page_size: number;
    total_element: number;
    total_page: number;
    page: number;
  };
}
