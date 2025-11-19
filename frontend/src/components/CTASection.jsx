import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Search } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-[#4DB8BA] via-[#5bc3c5] to-[#6bcfd1]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
          Plan with advice from people you trust
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#4DB8BA] font-bold px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            Start a Trip
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button 
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4DB8BA] font-bold px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            Explore Discover
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;