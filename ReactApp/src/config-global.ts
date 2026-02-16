import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
};

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:8001',
};
