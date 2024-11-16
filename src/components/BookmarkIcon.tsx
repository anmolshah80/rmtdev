import { BookmarkFilledIcon } from '@radix-ui/react-icons';

import { useBookmarksContext } from '@/lib/hooks';

type BookmarkIconProps = {
  jobID: number;
};

const BookmarkIcon = ({ jobID }: BookmarkIconProps) => {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  const isBookmarked = bookmarkedIds.includes(jobID);

  return (
    <button
      className="bookmark-btn"
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();

        handleToggleBookmark(jobID);
      }}
      title={isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
    >
      <BookmarkFilledIcon className={isBookmarked ? 'filled' : ''} />
    </button>
  );
};

export default BookmarkIcon;
