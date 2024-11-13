import { useEffect, useRef, useState } from 'react';

type SearchFormProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

const SearchForm = ({ searchText, setSearchText }: SearchFormProps) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const slashKeyCounterRef = useRef(0);

  const [slashKeyClassName, setSlashKeyClassName] = useState('slash-key');

  useEffect(() => {
    const focusSearchFieldOnHotkeyPress = (event: KeyboardEvent) => {
      if (event.key !== '/') return;

      if (searchInputRef.current === null) return;

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
  }, []);

  return (
    <form
      action="#"
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        className="search-input"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
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
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <span className={slashKeyClassName} title="Type / to start searching">
        /
      </span>
    </form>
  );
};

export default SearchForm;
