import logo from '@/assets/logo.svg';

const Logo = () => {
  return (
    <a href="/" className="logo">
      <img src={logo} alt="Logo" className="logo__img" />
    </a>
  );
};

export default Logo;
