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
