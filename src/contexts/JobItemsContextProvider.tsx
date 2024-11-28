import { createContext, useCallback, useMemo, useState } from 'react';

import { useSearchQuery, useSearchTextContext } from '@/lib/hooks';
import { TJobItem, TPageDirection, TSortBy } from '@/lib/types';
import { JOB_RESULTS_PER_PAGE } from '@/lib/constants';

type TJobItemsContext = {
  loading: boolean;
  errorMessage: string | undefined;
  jobItemsSortedAndSliced: TJobItem[];
  totalJobItems: number;
  currentPage: number;
  totalNumberOfPages: number;
  sortBy: TSortBy;
  handleChangePage: (direction: TPageDirection) => void;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
};

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

const JobItemsContextProvider = ({
  children,
}: JobItemsContextProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>('relevant');

  const { debouncedSearchText } = useSearchTextContext();

  const { loading, errorMessage, jobItems } =
    useSearchQuery(debouncedSearchText);

  // sort method mutates the original jobItems array and returns a reference to the same array so to prevent that we are spreading the jobItems in a new array and mutating that instead
  const jobItemsSorted = useMemo(() => {
    return [...(jobItems || [])].sort((a, b) => {
      if (sortBy === 'relevant') {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [jobItems, sortBy]);

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * JOB_RESULTS_PER_PAGE - JOB_RESULTS_PER_PAGE,
        currentPage * JOB_RESULTS_PER_PAGE,
      ),
    [jobItemsSorted, currentPage],
  );

  const totalJobItems = jobItems?.length || 0;
  const totalNumberOfPages = totalJobItems / 7;

  const handleChangePage = useCallback((direction: TPageDirection) => {
    if (direction === 'next') {
      setCurrentPage((previousValue) => previousValue + 1);
    } else if (direction === 'previous') {
      setCurrentPage((previousValue) => previousValue - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: TSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  // memoizing contextValue prevents unnecessary re-renders of consuming components, as debounceSearchText can cause frequent re-renders even if the context data hasn’t changed.
  const contextValue = useMemo(
    () => ({
      loading,
      errorMessage,
      jobItemsSortedAndSliced,
      totalJobItems,
      currentPage,
      totalNumberOfPages,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      loading,
      errorMessage,
      jobItemsSortedAndSliced,
      totalJobItems,
      currentPage,
      totalNumberOfPages,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ],
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
};

export default JobItemsContextProvider;
