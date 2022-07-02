export interface Material {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface MaterialsRequest {
  size?: number;
  page?: number;
  sort?: string;
  direction?: string;
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

export interface GetMaterialResponse {
  data: Material;
}

export interface PostMaterialRequest {
  name?: string;
  description?: string;
}

export interface PutMaterialRequest extends PostMaterialRequest {
  _id?: string;
}
