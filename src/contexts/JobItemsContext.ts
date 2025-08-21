import { createContext } from 'react';

import { TJobItem, TPageDirection, TSortBy } from '@/lib/types';

type TJobItemsContext = {
  loading: boolean;
  errorMessage: string | undefined;
  jobItemsSortedAndSliced: TJobItem[];
  totalJobItems: number;
  currentPage: number;
  totalNumberOfPages: number;
  sortBy: TSortBy;
  debouncedSearchText: string;
  handleChangePage: (direction: TPageDirection) => void;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);
