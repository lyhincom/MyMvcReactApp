import axiosInstance from './axios-instance';

// ----------------------------------------------------------------------

export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expires: string;
};

// ----------------------------------------------------------------------

/**
 * Login endpoint - doesn't require authentication token
 * Token is automatically skipped via axios interceptor
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
}

/**
 * Google OAuth login with ID token - doesn't require authentication token
 */
export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/google-login', {
      idToken,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Google login failed';
    throw new Error(errorMessage);
  }
}

