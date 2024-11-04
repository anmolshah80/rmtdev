import BookmarksButton from '@/components/BookmarksButton';
import Logo from '@/components/Logo';
import SearchForm from '@/components/SearchForm';

const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>

      <SearchForm />
    </header>
  );
};

export default Header;
