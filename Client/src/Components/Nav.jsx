import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        {/* Logo / Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
          Assembled Tutoring
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
          <Link to="/">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
              About
            </button>
          </Link>
          <Link to="/staff">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
              Staff
            </button>
          </Link>
          <Link to="/services">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
              Services
            </button>
          </Link>
          <Link to="/bookings">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
              Bookings
            </button>
          </Link>
          <Link to="/alumni">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
              Alumni
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium whitespace-nowrap">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}