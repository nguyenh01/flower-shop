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
