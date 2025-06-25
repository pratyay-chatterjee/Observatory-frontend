import React from 'react';
import { Telescope, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    { name: 'Calendar', href: '#event-calendar' },
    { name: 'Research', href: '#research' },
    { name: 'Members', href: '#members' },
    { name: 'Join Us', href: '#membership' },
    { name: 'Contact', href: '#contact' }
  ];

  const researchAreas = [
    'Gravitational Wave Astronomy',
    'Exoplanet Detection',
    'Stellar Evolution',
    'Galaxy Formation',
    'Computational Astrophysics',
    'Space Instrumentation'
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/6.png" 
                alt="Space Observatory Logo" 
                className="h-10 w-10 mr-3 object-contain"
              />
              <div>
                <h3 className="text-xl lg:text-2xl font-bold font-serif">
                  Prof. Amal Kumar Roychaudhury Center
                </h3>
                <p className="text-amber-200 font-medium lg:text-lg">for Astronomical Research</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-lg lg:text-lg">
              Dedicated to advancing the frontiers of astronomical research and nurturing the next generation 
              of space scientists through cutting-edge research and collaborative exploration.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-amber-400 flex-shrink-0" />
                <span className="text-sm lg:text-base">
                  University Of Engineering & Management, New Town, University Area, Plot No. III, B/5, 
                  New Town Rd, Action Area III, Newtown, New Town, West Bengal 700160
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-amber-400 flex-shrink-0" />
                <a href="mailto:pakrc@uem.edu.in" className="text-sm hover:text-amber-200 transition-colors">
                  pakrc@uem.edu.in
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-amber-400 flex-shrink-0" />
                <span className="text-sm lg:text-base">+91 33 6652 4444</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg lg:text-xl font-semibold mb-6 text-amber-200">Quick Links</h4>
            <ul className="space-y-3 lg:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm lg:text-base flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-lg lg:text-xl font-semibold mb-6 text-amber-200">Research Areas</h4>
            <ul className="space-y-3 lg:space-y-4">
              {researchAreas.map((area, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm lg:text-base leading-relaxed">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 lg:mt-16 pt-8 lg:pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left flex-1">
              <p className="text-gray-400 text-sm lg:text-base">
                © {currentYear} Prof. Amal Kumar Roychaudhury Center for Astronomical Research.
              </p>
              <p className="text-gray-400 text-sm lg:text-base">
                All rights reserved. University of Engineering and Management, Kolkata.
              </p>
              <p className="text-gray-400 text-xs lg:text-sm mt-2">
                This website and its content are protected by copyright law. 
                Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <div className="text-center md:text-right">
                <p className="text-amber-200 text-sm lg:text-base font-medium mb-1">Developed by</p>
                <div className="flex items-center gap-2">
                  <img 
                    src="/6.png" 
                    alt="Space Observatory Logo" 
                    className="h-4 w-4 object-contain"
                  />
                  <span className="text-gray-300 text-sm lg:text-base">Space Observatory, UEM Kolkata</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl flex items-center justify-center p-1">
                  <img 
                    src="/file.jpg" 
                    alt="UEM Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl flex items-center justify-center p-1">
                  <img 
                    src="/6.png" 
                    alt="Space Observatory Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;