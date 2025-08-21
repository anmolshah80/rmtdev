import { BookmarksContext } from '@/contexts/BookmarksContext';

import { useJobItems, useLocalStorage } from '@/lib/hooks';

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

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
