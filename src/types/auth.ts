export interface AuthState {
  token: string | null;
  username: string | null;
}

export interface LoginResponse {
  token?: string;
  access_token?: string;
  accessToken?: string;
}
