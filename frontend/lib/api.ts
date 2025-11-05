import { getStoredToken } from './tokenStorage';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getStoredToken() ?? ''}`
});

export const postJson = async <T>(path: string, body: unknown, includeAuth = true): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: includeAuth ? jsonHeaders() : { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const putJson = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: jsonHeaders()
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};
