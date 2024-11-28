import { useRef, useState } from 'react';

import BookmarksButton from '@/components/header/BookmarksButton';
import Logo from '@/components/header/Logo';
import SearchForm from '@/components/header/SearchForm';

import { useSearchTextContext } from '@/lib/hooks';

const Header = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isBookmarksPopoverOpen, setIsBookmarksPopoverOpen] = useState(false);

  const { searchText, handleChangeSearchText } = useSearchTextContext();

  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton
          isBookmarksPopoverOpen={isBookmarksPopoverOpen}
          setIsBookmarksPopoverOpen={setIsBookmarksPopoverOpen}
        />
      </div>

      <SearchForm
        searchText={searchText}
        handleChangeSearchText={handleChangeSearchText}
        setIsBookmarksPopoverOpen={setIsBookmarksPopoverOpen}
        ref={searchInputRef}
      />
    </header>
  );
};

export default Header;
