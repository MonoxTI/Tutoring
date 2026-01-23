import { Link } from "react-router-dom";
import { useState } from "react";
//import LOGO from "../Assets/LOGO.png";

export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-black via-blue-900 to-blue-500 text-white py-4 px-6 shadow-md border-b-2 border-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
         
        {/* Logo / Title - LEFT */}
        <h1 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
          Assembled Tutoring
        </h1>

        {/* Navigation Links - RIGHT */}
        <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4 relative">
          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              className="px-4 py-2 rounded-lg hover:bg-blue-800/70 transition-colors duration-200 font-medium whitespace-nowrap"
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              aria-haspopup="true"
              aria-expanded={isAboutOpen}
            >
              About
            </button>

            {/* Dropdown Menu */}
            {isAboutOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-lg shadow-lg z-10 py-2">
                <Link
                  to="/about"
                  className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => setIsAboutOpen(false)}
                >
                  Founder
                </Link>
                <Link
                  to="/mission"
                  className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => setIsAboutOpen(false)}
                >
                  Mission
                </Link>
              </div>
            )}
          </div>

          <Link to="/staff">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800/70 transition-colors duration-200 font-medium whitespace-nowrap">
              Staff
            </button>
          </Link>
          <Link to="/services">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800/70 transition-colors duration-200 font-medium whitespace-nowrap">
              Services
            </button>
          </Link>
          <Link to="/bookings">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800/70 transition-colors duration-200 font-medium whitespace-nowrap">
              Bookings
            </button>
          </Link>
          <Link to="/alumni">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800/70 transition-colors duration-200 font-medium whitespace-nowrap">
              Alumni
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800/70 transition-colors duration-200 font-medium whitespace-nowrap">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}