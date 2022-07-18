export interface RegisterResponse {
  message: string;
  token: string;
  type: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface PutUserRequest {
  firstName: string;
  lastName: string;
  phone: string | number;
}

export interface PutUserResponse {
  msg: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface GetAccountListRequest {
  size?: number;
  total_element?: number;
  total_page?: number;
  page?: number;
  sort?: string;
  direction?: string;
  type?: number;
}

export interface AccountItem {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  type: number;
}

export interface GetAccountListResponse {
  user: {
    result: AccountItem[];
    page_size: number;
    total_element: number;
    total_page: number;
    page: number;
  };
}

export interface LogoutRequest {
  refreshToken: string | null;
}
