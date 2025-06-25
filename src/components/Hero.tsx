import React, { useState, useEffect } from 'react';
import { Star, Telescope, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder images for carousel - will be replaced with actual images
  const carouselImages = [
    {
      src: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Deep space nebula with stars"
    },
    {
      src: "https://images.pexels.com/photos/87009/earth-solar-system-universe-planet-87009.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Solar system planets"
    },
    {
      src: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Galaxy spiral arms"
    },
    {
      src: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Observatory telescope under starry sky"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-blue-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-amber-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-20">
        <div className="mb-12">
          <Telescope className="h-16 w-16 text-amber-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif">
            Prof. Amal Kumar Roychaudhury Center
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-200 mb-8 font-serif">
            for Astronomical Research
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
        </div>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed px-4">
          UEM Space Observatory is the place to explore the night sky with a powerful telescope. 
          We are using <span className="text-amber-300 font-semibold">Skywatcher EQ6 Pro telescope</span> which is a reflecting type telescope 
          for astronomical observations, research and related activities through cutting-edge research and collaborative exploration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 px-4">
          <div className="text-center p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Star className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">Research Excellence</h3>
            <p className="text-gray-300 leading-relaxed">Observing astronomical events and publishing findings for general awareness</p>
          </div>
          <div className="text-center p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Telescope className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">Advanced Observatory</h3>
            <p className="text-gray-300 leading-relaxed">9.85 feet diameter dome with Skywatcher EQ6 Pro reflecting telescope</p>
          </div>
          <div className="text-center p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">Academic Community</h3>
            <p className="text-gray-300 leading-relaxed">Inviting students and public to explore astronomy and space science</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center px-4">
          <a
            href="#events"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Events
          </a>
          <a
            href="#research"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Research
          </a>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;