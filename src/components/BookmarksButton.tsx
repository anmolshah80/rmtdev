import { TriangleDownIcon } from '@radix-ui/react-icons';

const BookmarksButton = () => {
  return (
    <section>
      <button className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
    </section>
  );
};

export default BookmarksButton;
