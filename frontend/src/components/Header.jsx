import React, { useState, useEffect } from 'react';
import { Phone, User } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#323f65]/95 backdrop-blur-sm shadow-lg' : 'bg-[#323f65]'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo - Only animated video */}
          <div className="flex items-center flex-shrink-0">
            <div className="relative h-8 sm:h-10 md:h-12 lg:h-16 w-auto overflow-hidden px-1 sm:px-2" style={{ background: 'transparent' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-auto object-contain max-w-[100px] sm:max-w-[120px] md:max-w-none relative z-10 mix-blend-screen"
                style={{ maxHeight: '32px', filter: 'brightness(1.1) contrast(1.2)' }}
              >
                <source src="https://customer-assets.emergentagent.com/job_43a6966a-d890-4dd3-91aa-8c7f1d773745/artifacts/d3iha7rk_withoutline.webm" type="video/webm" />
              </video>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              className="bg-[#6b7c93] hover:bg-[#7a8ba5] text-white font-medium px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Contact Us</span>
              <span className="sm:hidden">Contact</span>
            </Button>
            <Button
              variant="ghost"
              className="bg-[#6b7c93] hover:bg-[#7a8ba5] text-white font-medium px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Login/Signup</span>
              <span className="sm:hidden">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;