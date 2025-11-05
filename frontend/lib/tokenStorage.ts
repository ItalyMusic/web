const TOKEN_KEY = 'shop-ton-token';

type Storage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const getStorage = (): Storage | undefined => {
  if (typeof window === 'undefined') return undefined;
  return window.localStorage;
};

export const getStoredToken = () => {
  const storage = getStorage();
  return storage?.getItem(TOKEN_KEY) ?? null;
};

export const setStoredToken = (token: string) => {
  const storage = getStorage();
  storage?.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = () => {
  const storage = getStorage();
  storage?.removeItem(TOKEN_KEY);
};
