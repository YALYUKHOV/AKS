export const getApiBase = (): string => {
  const path = window.location.pathname;
  const context = path.substring(0, path.indexOf('/', 1));
  if (context && context !== '/api' && !context.startsWith('/src')) {
    return `${context}/api`;
  }
  return '/api';
};

export const API_BASE = getApiBase();

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson.error) errorMessage = errorJson.error;
      else if (errorJson.message) errorMessage = errorJson.message;
    } catch {
    }
    throw new Error(errorMessage);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : {}) as T;
}
