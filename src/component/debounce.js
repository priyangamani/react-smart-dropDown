import React, { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      return () => {
        clearTimeout(handler);
      };
    },
    [delay, value] 
  );

  return debouncedValue;
}