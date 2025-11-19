import React from 'react';
import { Shield } from 'lucide-react';

const CommunitySection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3a4d6f] leading-tight">
              Travel Advice from People Who Know You
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Tucker Trips connects your circle's real experiences—what worked, what didn't, and what they'd do differently.
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4DB8BA]/20 rounded-full flex items-center justify-center mt-1 animate-sticky-bounce">
                  <div className="w-3 h-3 bg-[#4DB8BA] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#3a4d6f] mb-1 text-sm sm:text-base">Your circle, your reviews</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Only people you invite.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4DB8BA]/20 rounded-full flex items-center justify-center mt-1 animate-sticky-bounce" style={{ animationDelay: '0.5s' }}>
                  <div className="w-3 h-3 bg-[#4DB8BA] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#3a4d6f] mb-1 text-sm sm:text-base">Context that matters</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Budget, season, gotchas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4DB8BA]/20 rounded-full flex items-center justify-center mt-1 animate-sticky-bounce" style={{ animationDelay: '1s' }}>
                  <div className="w-3 h-3 bg-[#4DB8BA] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#3a4d6f] mb-1 text-sm sm:text-base">Ask follow-ups</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Message your friend directly.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#4DB8BA]/10 border-l-4 border-[#4DB8BA] p-4 sm:p-6 rounded-lg flex items-center gap-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB8BA] flex-shrink-0" />
              <p className="text-sm sm:text-base font-semibold text-[#3a4d6f]">
                Private by default. Public when you're ready.
              </p>
            </div>
          </div>

          {/* Single Quality Image */}
          <div className="animate-float">
            <img
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80"
              alt="Hiker with backpack celebrating on mountain peak with scenic vista"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl transform hover:scale-[1.03] transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;