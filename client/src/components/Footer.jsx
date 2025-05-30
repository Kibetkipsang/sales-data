const Footer = () => {
  return (
    <footer className="bg-green-400 text-center p-4 mt-10 shadow-inner h-32">
      <p className="text-gray-600 mt-12">&copy; {new Date().getFullYear()} Sales Data Report Program</p>
    </footer>
  );
};

export default Footer;