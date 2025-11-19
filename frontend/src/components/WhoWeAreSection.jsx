import React from 'react';

const WhoWeAreSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3a4d6f] leading-tight mb-4 md:mb-6">
            The Anti-Anonymous-Review Approach
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A <strong className="text-[#ec4899]">trusted trip log</strong> for people who know each other.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-[#4DB8BA] mb-3 sm:mb-4 animate-pulse">1</div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#3a4d6f] mb-3 sm:mb-4">
              Log experiences
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Dates, maps, photos, costs, lessons learned.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-[#4DB8BA] mb-3 sm:mb-4 animate-pulse" style={{ animationDelay: '0.2s' }}>2</div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#3a4d6f] mb-3 sm:mb-4">
              Access trip logs
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From friends and family.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-[#4DB8BA] mb-3 sm:mb-4 animate-pulse" style={{ animationDelay: '0.4s' }}>3</div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#3a4d6f] mb-3 sm:mb-4">
              Ask real questions
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              No paid placements.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-[#4DB8BA] mb-3 sm:mb-4 animate-pulse" style={{ animationDelay: '0.6s' }}>4</div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#3a4d6f] mb-3 sm:mb-4">
              Plan confidently
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Avoid past mistakes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;