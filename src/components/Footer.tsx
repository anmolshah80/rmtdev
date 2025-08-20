const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="copyright">&copy; {currentYear}</p>
      <span>Remote</span>
      <span>Dev</span>
    </footer>
  );
};

export default Footer;
