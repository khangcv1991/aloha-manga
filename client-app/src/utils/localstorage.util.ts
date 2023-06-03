import { useState } from 'react';

export const getLocalStorageItem = <T>(key: string): T => {
  try {
    const data = window.localStorage.getItem(key);
    return !data || data === 'undefined' ? null : (JSON.parse(data) as T);
  } catch (e: unknown) {
    console.error(
      `Could not get item ${key} from local storage. Reason: ${
        (e as Error).message
      }`,
    );
  }
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e: unknown) {
    console.error(
      `Could not set item ${key} from local storage. Reason: ${
        (e as Error).message
      }`,
    );
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (e: unknown) {
    console.error(
      `Could not remove item ${key} from local storage. Reason: ${
        (e as Error).message
      }`,
    );
  }
};

// With thanks to https://usehooks.com/useLocalStorage/
export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = getLocalStorageItem<T>(key);
      // Parse stored json or if none return initialValue
      return item || initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? (value(storedValue) as T) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined' && key) {
        setLocalStorageItem<T>(key, valueToStore);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
