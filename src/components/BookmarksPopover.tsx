import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

import { useBookmarksContext } from '@/lib/hooks';

import Spinner from '@/components/Spinner';
import JobList from '@/components/container/sidebar/jobList/JobList';

import noDataFoundUI from '@/assets/no-data-found-ui.png';

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isBookmarkedJobItemsLoading } =
    useBookmarksContext();

  if (isBookmarkedJobItemsLoading) {
    return (
      <div className="bookmarks-popover">
        <div className="bookmarks-container">
          <Spinner />
        </div>
      </div>
    );
  }

  if (bookmarkedJobItems.length === 0) {
    return createPortal(
      <div className="bookmarks-popover">
        <div className="bookmarks-container">
          <img
            src={noDataFoundUI}
            alt="No bookmarks found"
            className="no-bookmarks-found-img"
          />

          <p>
            No bookmarks found!
            <span>
              Try searching for a job and bookmark your favorite job posting.
            </span>
          </p>
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList
        jobItems={bookmarkedJobItems}
        loading={isBookmarkedJobItemsLoading}
      />
    </div>,
    document.body,
  );
});

export default BookmarksPopover;
