import { forwardRef, useEffect, useRef, useState } from 'react';
import { Loader, Search } from 'lucide-react';

import { useJobItemsContext } from '@/lib/hooks';

type SearchFormProps = {
  searchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
  setIsBookmarksPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(
  ({ searchText, handleChangeSearchText, setIsBookmarksPopoverOpen }, ref) => {
    const searchInputRef =
      ref as React.MutableRefObject<HTMLInputElement | null>;

    const slashKeyCounterRef = useRef(0);

    const [slashKeyClassName, setSlashKeyClassName] = useState('slash-key');

    const { loading } = useJobItemsContext();

    useEffect(() => {
      const focusSearchFieldOnHotkeyPress = (event: KeyboardEvent) => {
        if (event.key !== '/') return;

        if (searchInputRef.current === null) return;

        setIsBookmarksPopoverOpen(false);

        // prevent adding the slash key in the search input field upon entering the slash key for the first time
        if (slashKeyCounterRef.current === 0) {
          event.preventDefault();

          searchInputRef.current.focus();
          slashKeyCounterRef.current += 1;

          return;
        }

        searchInputRef.current.focus();
      };

      document.addEventListener('keydown', focusSearchFieldOnHotkeyPress);

      return () => {
        document.removeEventListener('keydown', focusSearchFieldOnHotkeyPress);
      };
    }, [searchInputRef, setIsBookmarksPopoverOpen]);

    return (
      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="text"
          name="searchInput"
          spellCheck="false"
          required
          placeholder="Find remote dev jobs..."
          className="search-input"
          value={searchText}
          onChange={(event) => handleChangeSearchText(event.target.value)}
          onFocus={() => {
            setSlashKeyClassName('slash-key-hide');
          }}
          onBlur={() => {
            slashKeyCounterRef.current = 0;
            setSlashKeyClassName('slash-key');
          }}
          ref={searchInputRef}
        />

        <button type="submit">
          {loading ? (
            <Loader width={20} height={20} className="search-spinner-icon" />
          ) : (
            <Search width={20} height={20} />
          )}
        </button>

        <span className={slashKeyClassName} title="Type / to start searching">
          /
        </span>
      </form>
    );
  },
);

export default SearchForm;
