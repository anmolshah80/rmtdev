import BookmarksButton from '@/components/header/BookmarksButton';
import Logo from '@/components/header/Logo';
import SearchForm from '@/components/header/SearchForm';

type HeaderProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ searchText, setSearchText }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>

      <SearchForm searchText={searchText} setSearchText={setSearchText} />
    </header>
  );
};

export default Header;
