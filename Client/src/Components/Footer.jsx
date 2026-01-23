function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-blue-900 to-blue-500 text-white py-4 px-6 shadow-md border-t-2 border-white">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p>&copy; {new Date().getFullYear()} Assembled Tutoring</p>
        <p>Contact us: fakeEmail@yahoo.com</p>
        <p>Phone: 012 345 6789</p>
        <p>Headquarter: Montana Tuine Pretoria 0182</p>
      </div>
    </footer>
  );
}

export default Footer;