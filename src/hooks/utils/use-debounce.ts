import { useCallback } from 'react';

export const useDebounce = <A extends any[]>(
  callback: (...args: A) => void,
  delay: number = 300,
) => {
  const debouncedCallback = useCallback(debounce(callback, delay), [callback, delay]);

  return debouncedCallback;
};

const debounce = <T extends any[]>(callback: (...args: T) => void, delay: number) => {
  let timerId: NodeJS.Timeout;

  return function (...args: T) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
