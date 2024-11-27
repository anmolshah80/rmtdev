import { useRef, useState } from 'react';
import { TriangleDownIcon } from '@radix-ui/react-icons';

import BookmarksPopover from '@/components/BookmarksPopover';

import { useOnClickOutside } from '@/lib/hooks';

const BookmarksButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        className="bookmarks-btn"
        onClick={() => setIsOpen((previousValue) => !previousValue)}
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
};

export default BookmarksButton;
