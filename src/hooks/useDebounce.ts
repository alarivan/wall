import { useEffect } from 'react';

export default function useDebounce(
  value: any,
  callback: (value: any) => void,
  delay: number,
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
}
