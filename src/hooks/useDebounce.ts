import { useRef, useEffect } from 'react';

const useDebounce = (fn: () => void, deps: any, delay = 300) => {
  const typingRef = useRef<any>(null);

  useEffect(() => {
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    typingRef.current = setTimeout(fn, delay);
  }, deps);
};

export default useDebounce;
