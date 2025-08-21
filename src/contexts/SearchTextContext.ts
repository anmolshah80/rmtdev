import { createContext } from 'react';

type TSearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<TSearchTextContext | null>(null);
