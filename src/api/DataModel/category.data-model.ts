export interface Category {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface CategoriesResponse {
  data: Category[];
}
