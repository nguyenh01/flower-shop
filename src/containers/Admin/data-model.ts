export interface InitialValueProductFormik {
  id?: string;
  name?: string;
  cate_id?: string;
  mate_id?: string;
  price?: number | string;
  unitsinstock?: number | string;
  description?: string;
  images?: string[];
}

export interface InitialValueCategoryAndMaterialFormik {
  name?: string;
  description?: string;
}
