import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
  googleClientId: string;
};

// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  
  // Runtime check: if running in browser, check the current hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Localhost development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'https://localhost:8001';
    }
    
    // Production domain
    if (hostname.includes('react.lyhin.com')) {
      return 'https://react.lyhin.com';
    }
    
    // Fallback: use relative URLs for any other domain
    return '';
  }
  
  // Fallback for SSR or build time: use relative URLs
  return '';
};

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  apiBaseUrl: getApiBaseUrl(),
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
};
