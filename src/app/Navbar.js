import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className={`lg:backdrop-blur-md lg:rounded-full lg:border lg:border-white/20 lg:shadow-lg transition-all duration-300 ${
            isScrolled ? 'lg:bg-white/20' : 'lg:bg-white/10'
          } px-6 sm:px-8 lg:px-12 py-2 sm:py-3 relative`}>
            
            {/* Mobile Logo - Posisi Fixed di Tengah */}
            <div className="lg:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <Image 
                src="/logoPutih.svg" 
                alt="Logo" 
                width={32} 
                height={32}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>

            {/* Mobile Hamburger Menu - Posisi Fixed di Kanan */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
              <button
                onClick={toggleMenu}
                className={`flex flex-col justify-center items-center w-12 h-12 transition-all duration-300 ${
                  isMenuOpen ? 'rounded-full bg-white/10 backdrop-blur-sm' : ''
                }`}
                aria-label="Toggle menu"
              >
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} my-0.5`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </button>
            </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center">
            {/* Left side - Navigation links */}
            <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <a href="#Home" className="text-white text-xs lg:text-sm font-medium hover:text-gray-200 transition-colors duration-200">
                Home
              </a>
              <a href="#About-Us" className="text-white text-xs lg:text-sm font-medium hover:text-gray-200 transition-colors duration-200">
                About Us
              </a>
            </div>

            {/* Center - Logo */}
            <div className="hidden lg:flex items-center justify-center mx-3 lg:mx-4 xl:mx-6">
              <Image 
                src="/logoPutih.svg" 
                alt="Logo" 
                width={28} 
                height={28}
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            </div>

            {/* Right side - Navigation links */}
            <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <a href="#Portfolio" className="text-white text-xs lg:text-sm font-medium hover:text-gray-200 transition-colors duration-200">
                Portfolio
              </a>
              <a href="#Contact" className="text-white text-xs lg:text-sm font-medium hover:text-gray-200 transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>



          {/* Mobile Menu Overlay */}
          <div className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} onClick={() => setIsMenuOpen(false)}></div>

          {/* Mobile Menu Dropdown */}
          <div className={`lg:hidden fixed top-20 left-0 right-0 w-full h-1/2 transition-all duration-300 ${
            isMenuOpen ? 'translate-y-0 backdrop-blur-md bg-white/15 border-b border-white/20 shadow-xl' : '-translate-y-full pointer-events-none'
          }`}>
            <div className="py-6 px-6 h-full flex flex-col">
              <ul className={`flex flex-col space-y-6 flex-1 justify-center transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}>
                <li>
                  <a 
                    href="#Home" 
                    className="block text-white text-xl font-medium hover:text-gray-200 transition-colors duration-200 py-4 px-6 rounded-lg hover:bg-white/10 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#About-Us" 
                    className="block text-white text-xl font-medium hover:text-gray-200 transition-colors duration-200 py-4 px-6 rounded-lg hover:bg-white/10 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#Portfolio" 
                    className="block text-white text-xl font-medium hover:text-gray-200 transition-colors duration-200 py-4 px-6 rounded-lg hover:bg-white/10 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a 
                    href="#Contact" 
                    className="block text-white text-xl font-medium hover:text-gray-200 transition-colors duration-200 py-4 px-6 rounded-lg hover:bg-white/10 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
} 