const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; {currentYear}
        <img src="/favicon.png" alt="logo" />
      </p>
    </footer>
  );
};

export default Footer;
