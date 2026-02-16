import { CONFIG } from 'src/config-global';

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
 */
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${CONFIG.apiBaseUrl}/api/users`, {
    method: 'GET',
  });

  return response.json();
}
