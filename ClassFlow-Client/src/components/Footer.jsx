const Footer = () => {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <div>
      <p>&copy; {year} ClassFlow. All rights reserved.</p>
    </div>
  );
};

export default Footer;
