import { createContext, useState } from 'react';

import { useDebounce } from '@/lib/hooks';

type TSearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

export const SearchTextContext = createContext<TSearchTextContext | null>(null);

const SearchTextContextProvider = ({
  children,
}: SearchTextContextProviderProps) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;
