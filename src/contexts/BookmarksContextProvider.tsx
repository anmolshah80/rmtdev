import { createContext, useEffect, useState } from 'react';

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type TBookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (jobID: number) => void;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

const BookmarksContextProvider = ({
  children,
}: BookmarksContextProviderProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    const localJobIds = localStorage.getItem('rmtdev-job-ids');

    const parsedJson = JSON.parse(localJobIds || '[]');

    return parsedJson;
  });

  const handleToggleBookmark = (jobID: number) => {
    if (bookmarkedIds.includes(jobID)) {
      setBookmarkedIds((previousIds) =>
        previousIds.filter((bookmarkedId) => bookmarkedId !== jobID),
      );
    } else {
      setBookmarkedIds((previousIds) => [...previousIds, jobID]);
    }
  };

  useEffect(() => {
    localStorage.setItem('rmtdev-job-ids', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContextProvider;
