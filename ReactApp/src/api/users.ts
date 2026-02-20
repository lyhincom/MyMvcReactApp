import axios from 'axios';

import axiosInstance from './axios-instance';

// ----------------------------------------------------------------------

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  isVerified: boolean;
  avatarUrl: string;
};

// ----------------------------------------------------------------------

/**
 * Fetches all users from the backend
 * Token is automatically added via axios interceptor
 * @param signal - Optional AbortSignal to cancel the request
 */
export async function getUsers(signal?: AbortSignal, isAuthorizationExample?: boolean): Promise<User[]> {
  try {
    const url = isAuthorizationExample ? '/api/users/admin' : '/api/users';
    const response = await axiosInstance.get<User[]>(url, {
      timeout: 10000, // 10 second timeout
      signal, // Pass abort signal to cancel request
    });
    return response.data;
  } catch (error: any) {
    // Ignore errors from aborted requests
    if (axios.isCancel(error) || error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw error; // Re-throw to be handled by caller
    }
    
    // Handle timeout
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check if the server is running.');
    }
    
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to fetch users';
    throw new Error(errorMessage);
  }
}
