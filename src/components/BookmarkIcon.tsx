import { BookmarkFilledIcon } from '@radix-ui/react-icons';

import { useBookmarksContext } from '@/lib/hooks';

type BookmarkIconProps = {
  jobID: number;
};

const BookmarkIcon = ({ jobID }: BookmarkIconProps) => {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  const isBookmarked = bookmarkedIds.includes(jobID);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    handleToggleBookmark(jobID);
  };

  return (
    <button
      className="bookmark-btn"
      onClick={handleClick}
      title={isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
    >
      <BookmarkFilledIcon className={isBookmarked ? 'filled' : ''} />
    </button>
  );
};

export default BookmarkIcon;
