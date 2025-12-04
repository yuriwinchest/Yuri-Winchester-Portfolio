import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  primaryColor: string;
  isDark?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ primaryColor, isDark = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = `text-${primaryColor} font-semibold`; // Dynamically use primary color class may not work with JIT if not safe-listed, but assume standard colors or style attribute.
  const textColor = isDark ? 'text-zinc-200' : 'text-zinc-600';
  const hoverColor = isDark ? 'hover:text-white' : 'hover:text-black';
  const headingColor = isDark ? 'text-white' : 'text-zinc-900';

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projects' },
    { name: 'Habilidades', path: '/skills' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <NavLink to="/" className={`text-xl font-bold ${headingColor}`}>
          Yuri Winchester
        </NavLink>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              style={({ isActive }) => isActive ? { color: primaryColor } : {}}
              className={`${textColor} hover:opacity-80 transition-colors`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-md ${textColor} hover:bg-gray-200/20`}
        >
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2 bg-white/5 dark:bg-black/5 backdrop-blur-md rounded-lg p-4">
           {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => isActive ? { color: primaryColor } : {}}
              className={`block px-3 py-2 rounded-md text-base font-medium ${textColor} hover:bg-gray-200/20`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;