import { login, type LoginRequest, type LoginResponse } from 'src/api/auth';

// ----------------------------------------------------------------------

const TOKEN_KEY = 'authToken';
const TOKEN_EXPIRES_KEY = 'tokenExpires';

// ----------------------------------------------------------------------

export class AuthService {
  /**
   * Performs login and stores the authentication token
   */
  async signIn(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await login(credentials);

    console.log('response', response);

    // Store token in localStorage
    this.setToken(response.token);
    this.setTokenExpires(response.expires);

    return response;
  }

  /**
   * Signs out the user by removing the token
   */
  signOut(): void {
    this.removeToken();
    this.removeTokenExpires();
  }

  /**
   * Gets the current authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Checks if the user is authenticated (has a valid token)
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Check if token is expired
    const expires = this.getTokenExpires();
    if (expires) {
      const expiresDate = new Date(expires);
      if (expiresDate < new Date()) {
        this.signOut();
        return false;
      }
    }

    return true;
  }

  /**
   * Gets the token expiration date
   */
  getTokenExpires(): string | null {
    return localStorage.getItem(TOKEN_EXPIRES_KEY);
  }

  /**
   * Sets the authentication token
   */
  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Sets the token expiration date
   */
  private setTokenExpires(expires: string): void {
    localStorage.setItem(TOKEN_EXPIRES_KEY, expires);
  }

  /**
   * Removes the authentication token
   */
  private removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Removes the token expiration date
   */
  private removeTokenExpires(): void {
    localStorage.removeItem(TOKEN_EXPIRES_KEY);
  }
}

// Export a singleton instance
export const authService = new AuthService();

