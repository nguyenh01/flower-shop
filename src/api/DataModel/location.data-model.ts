export interface ProvinceResponse {
  msg: string;
  result: {
    ProvinceID: number;
    ProvinceName: string;
  }[];
}

export interface DistrictResponse {
  msg: string;
  result: {
    DistrictID: number;
    DistrctName: string;
  }[];
}

export interface DistrictRequest {
  id?: number | string;
}

export interface WardResponse {
  msg: string;
  result: {
    WardCode: number;
    WardName: string;
  }[];
}

export interface WardRequest {
  id?: number | string;
}

export interface ShipFeeResponse {
  msg: string;
  result: {
    ship_fee: number;
  };
}

export interface ShipFeeRequest {
  to_district_id: number;
  to_ward_code: number;
}
