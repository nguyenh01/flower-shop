import { useState } from 'react';
import useDebounce from './useDebounce';

const useDebounceSearch = () => {
  const DELAY = 500;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>('');

  useDebounce(
    () => {
      setDebounceSearchTerm(searchTerm);
    },
    [searchTerm],
    DELAY
  );

  const onChangeSearchTerm = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return { searchTerm: debounceSearchTerm, onChangeSearchTerm };
};

export default useDebounceSearch;
