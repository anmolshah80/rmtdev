import BookmarksButton from '@/components/BookmarksButton';
import Logo from '@/components/Logo';
import SearchForm from '@/components/SearchForm';

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
