const safeParse = <T>(value: string | null): T | null => {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const readStorage = <T>(key: string, fallback: T): T => {
  try {
    const parsed = safeParse<T>(window.localStorage.getItem(key));
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = <T>(key: string, value: T): boolean => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};
