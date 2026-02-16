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
 */
export async function getUsers(): Promise<User[]> {
  try {
    const response = await axiosInstance.get<User[]>('/api/users', {
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error: any) {
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
