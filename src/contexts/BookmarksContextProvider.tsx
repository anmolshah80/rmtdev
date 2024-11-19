import { createContext } from 'react';

import { useJobItems, useLocalStorage } from '@/lib/hooks';
import { TJobItemExpanded } from '@/lib/types';

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type TBookmarksContext = {
  bookmarkedIds: number[];
  bookmarkedJobItems: TJobItemExpanded[];
  isBookmarkedJobItemsLoading: boolean;
  handleToggleBookmark: (jobID: number) => void;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

const BookmarksContextProvider = ({
  children,
}: BookmarksContextProviderProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'rmtdev-job-ids',
    [],
  );

  const { loading: isBookmarkedJobItemsLoading, jobItems: bookmarkedJobItems } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (jobID: number) => {
    if (bookmarkedIds.includes(jobID)) {
      setBookmarkedIds((previousIds) =>
        previousIds.filter((bookmarkedId) => bookmarkedId !== jobID),
      );
    } else {
      setBookmarkedIds((previousIds) => [...previousIds, jobID]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        bookmarkedJobItems,
        isBookmarkedJobItemsLoading,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContextProvider;
