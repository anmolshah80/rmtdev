import { useRef } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';

import BookmarksPopover from '@/components/BookmarksPopover';

import { useOnClickOutside } from '@/lib/hooks';

type BookmarksButtonProps = {
  isBookmarksPopoverOpen: boolean;
  setIsBookmarksPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookmarksButton = ({
  isBookmarksPopoverOpen,
  setIsBookmarksPopoverOpen,
}: BookmarksButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () =>
    setIsBookmarksPopoverOpen(false),
  );

  return (
    <section>
      <button
        ref={buttonRef}
        className="bookmarks-btn"
        onClick={() =>
          setIsBookmarksPopoverOpen((previousValue) => !previousValue)
        }
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isBookmarksPopoverOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
};

export default BookmarksButton;
