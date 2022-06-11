export interface LoginResponse {
  message: string;
  token: string;
  type: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
