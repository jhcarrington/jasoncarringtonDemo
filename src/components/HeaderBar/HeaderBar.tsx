import { useState } from 'react';
import { Link } from 'react-router-dom';
import JasonProfilePicture from '../JasonPicture';
import './HeaderBar.css';

export default function HeaderBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold font-signature">
          Jason Carrington
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="block md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="block md:hidden">
            <JasonProfilePicture />
          </div>
        </div>

        <div className="hidden md:block">
          <nav className="md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/projects" className="hover:text-gray-300">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>

            <JasonProfilePicture />
          </nav>
        </div>
      </div>
      <div className="md:hidden">
        <nav
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:flex items-center space-x-6`}
        >
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/projects" className="hover:text-gray-300">
            Projects
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
