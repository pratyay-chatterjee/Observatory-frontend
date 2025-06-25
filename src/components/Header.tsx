import React, { useState } from 'react';
import { Menu, X, Telescope } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    { name: 'Calendar', href: '#event-calendar' },
    { name: 'Research', href: '#research' },
    { name: 'Members', href: '#members' },
    { name: 'Join Us', href: '#membership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-3 mr-4">
                <img 
                  src="/file.jpg" 
                  alt="UEM Logo" 
                  className="h-10 w-10 object-contain"
                />
                <img 
                  src="/6.png" 
                  alt="Space Observatory Logo" 
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-blue-900 leading-tight font-serif">
                  Prof. Amal Kumar Roychaudhury Center
                </h1>
                <p className="text-sm text-amber-600 font-medium">
                  for Astronomical Research
                </p>
              </div>
              <div className="md:hidden">
                <div>
                  <h1 className="text-lg font-bold text-blue-900 font-serif">PAKRC</h1>
                  <p className="text-xs text-amber-600 font-medium">
                    Astronomical Research
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-900 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-blue-50 rounded-lg relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-blue-900 focus:outline-none focus:text-blue-900 transition-colors duration-300"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Menu className="h-6 w-6" />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
                  <X className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-4 py-6 space-y-2 bg-gradient-to-b from-blue-50 to-white border-t border-gray-100">
            <div className="text-center mb-4">
              <div className="w-16 h-0.5 bg-blue-900 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-900 hover:bg-blue-100 block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-lg border border-transparent hover:border-blue-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                University of Engineering and Management, Kolkata
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;