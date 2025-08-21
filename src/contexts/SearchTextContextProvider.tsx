import { useState } from 'react';

import { SearchTextContext } from '@/contexts/SearchTextContext';

import { useDebounce } from '@/lib/hooks';

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

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
