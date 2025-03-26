import {useEffect, useRef } from 'react';

type Debounce = (func: (val: string) => void, wait: number) => (val: string) => void;


const useDebounce = () : {debounce: Debounce} => {
  const timeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const debounce: Debounce = (func, wait) => (value: string) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(()=> func(value), wait);
  } 

  useEffect(()=> {
    return (): void => {
      if (!timeout.current) return;
      clearTimeout(timeout.current);
    }
  }, []);

  return {debounce};
}

export default useDebounce;