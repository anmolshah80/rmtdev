import { createContext } from 'react';

import { TJobItemExpanded } from '@/lib/types';

type TBookmarksContext = {
  bookmarkedIds: number[];
  bookmarkedJobItems: TJobItemExpanded[];
  isBookmarkedJobItemsLoading: boolean;
  handleToggleBookmark: (jobID: number) => void;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);
