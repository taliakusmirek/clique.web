import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
      scrolled || isMenuOpen ? 'bg-obsidian/80 backdrop-blur-md shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Menu Button - Visible only on Mobile */}
        <div className="flex md:hidden items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 absolute ${isMenuOpen ? 'rotate-45 top-2' : 'top-0'}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 absolute top-2 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transform transition-all duration-300 absolute ${isMenuOpen ? '-rotate-45 top-2' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-8 w-1/3">
          <Link 
            to="/TechSpecs" 
            className="text-white/80 hover:text-white transition-all duration-300 text-sm tracking-wide relative group"
          >
            <span>Tech Specs</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#66909E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a 
            href="mailto:kusmire@bc.edu" 
            className="text-white/80 hover:text-white transition-all duration-300 text-sm tracking-wide relative group"
          >
            <span>Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#66909E] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Centered Logo */}
        <div className="flex justify-center flex-1 md:w-1/3">
          <Link 
            to="/" 
            className="text-white text-2xl font-display font-bold tracking-[0.3em] hover:opacity-80 transition-opacity duration-300 relative z-20"
          >
            VAULT
          </Link>
        </div>

        {/* Desktop Waitlist Button - Hidden on Mobile */}
        <div className="hidden md:flex items-center justify-end w-1/3">
          <Link 
            to="/Waitlist" 
            className="bg-[#66909E]/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg transition-all duration-300 text-sm tracking-wide hover:bg-[#66909E]/20 hover:shadow-lg hover:shadow-[#66909E]/10 hover:-translate-y-0.5 relative overflow-hidden group"
          >
            <span className="relative z-10">Join Waitlist</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#66909E]/0 via-[#66909E]/20 to-[#66909E]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[72px] bg-obsidian/95 backdrop-blur-md shadow-lg z-40"
          >
            <div className="flex flex-col space-y-6 p-8">
              <Link 
                to="/TechSpecs" 
                className="text-white/80 hover:text-white transition-all duration-300 text-lg tracking-wide relative group"
                onClick={toggleMenu}
              >
                <span>Tech Specs</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#66909E] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a 
                href="mailto:kusmire@bc.edu" 
                className="text-white/80 hover:text-white transition-all duration-300 text-lg tracking-wide relative group"
                onClick={toggleMenu}
              >
                <span>Contact</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#66909E] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link 
                to="/Waitlist" 
                className="bg-[#66909E]/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg transition-all duration-300 text-lg tracking-wide hover:bg-[#66909E]/20 text-center group"
                onClick={toggleMenu}
              >
                <span className="relative z-10">Join Waitlist</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#66909E]/0 via-[#66909E]/20 to-[#66909E]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-full h-16 pixel-dots opacity-5" />
    </nav>
  );
};

export default Navbar; 