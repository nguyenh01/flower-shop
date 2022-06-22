export interface Material {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface MaterialResponse {
  data: Material[];
}
