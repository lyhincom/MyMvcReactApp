import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export type LoginRequest = {
  Login: string;
  Password: string;
};

export type LoginResponse = {
  Token: string;
  Expires: string;
};

export type ApiError = {
  message: string;
};

// ----------------------------------------------------------------------

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  console.log('CONFIG.apiBaseUrl', CONFIG.apiBaseUrl);
  const response = await fetch(`${CONFIG.apiBaseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: 'An error occurred during login',
    }));
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

