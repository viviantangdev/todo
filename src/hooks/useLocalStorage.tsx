import { useEffect, useState } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initalValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      return typeof initalValue === 'function'
        ? (initalValue as () => T)()
        : initalValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};
