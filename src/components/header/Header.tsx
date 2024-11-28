import { useRef, useState } from 'react';

import BookmarksButton from '@/components/header/BookmarksButton';
import Logo from '@/components/header/Logo';
import SearchForm from '@/components/header/SearchForm';

type HeaderProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ searchText, setSearchText }: HeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isBookmarksPopoverOpen, setIsBookmarksPopoverOpen] = useState(false);

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
        setSearchText={setSearchText}
        setIsBookmarksPopoverOpen={setIsBookmarksPopoverOpen}
        ref={searchInputRef}
      />
    </header>
  );
};

export default Header;
