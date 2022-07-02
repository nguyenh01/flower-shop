export interface Category {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface CategoriesResponse {
  data: {
    result: Category[];
    total_element: number;
    total_page: number;
    page_size: number;
    page: number;
  };
}

export interface GetCategoryResponse {
  data: Category;
}

export interface CategoriesRequest {
  size?: number;
  page?: number;
  sort?: string;
  direction?: string;
  name?: string;
  is_paging?: boolean;
}
export interface PostCategoryRequest {
  name?: string;
  description?: string;
}

export interface PutCategoryRequest extends PostCategoryRequest {
  _id?: string;
}
