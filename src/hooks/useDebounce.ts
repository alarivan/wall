import { useEffect, useState } from 'react';

export default function useDebounce(
  value: any,
  callback: (value: any) => void,
  delay: number,
) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    let handler: number | null = null;

    if (inputValue !== value) {
      handler = setTimeout(() => {
        callback(inputValue);
      }, delay);
    }

    return () => {
      if (handler) clearTimeout(handler);
    };
  }, [inputValue, value, callback, delay]);

  return [inputValue, setInputValue];
}
