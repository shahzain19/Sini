import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed z-50 top-0">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          HI
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="#contact"
            className="text-gray-200 hover:text-white transition"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="ml-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Get a Website
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
