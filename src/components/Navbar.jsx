import React from 'react';
import { Link } from 'react-router-dom';
import S from '../../public/S.png'; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#111111] border-b border-zinc-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          Sinify
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#testimonials" className="text-gray-200 hover:text-white transition">Testimonials</a>
          <a href="#contact" className="text-gray-200 hover:text-white transition">Contact</a>
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
