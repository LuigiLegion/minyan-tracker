// Imports
import { useEffect, useRef } from 'react';

// Initializations
const usePrevious = val => {
  const ref = useRef();

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
};

// Exports
export default usePrevious;
