import React from 'react';
import { Heart } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Testimonial Quote */}
        <div className="mb-12 md:mb-16 bg-gradient-to-br from-[#4DB8BA]/10 to-[#ec4899]/10 p-6 sm:p-8 md:p-12 rounded-2xl border-l-4 border-[#ec4899]">
          <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-4 sm:mb-6">
            "I stopped doom-scrolling strangers' reviews. With Tucker Trips, I plan using notes from people I actually know."
          </blockquote>
          <p className="text-base sm:text-lg font-bold text-[#3a4d6f]">— Kristin Stein, Founder</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3a4d6f] leading-tight">
              Why I Founded Tucker Trips
            </h2>
            <div className="space-y-3 md:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              <p>
                I started Tucker Trips after becoming increasingly frustrated with the endless—and often fruitless—search for <strong className="text-[#3a4d6f]">trustworthy travel reviews</strong>. While planning family vacations, I found myself drowning in anonymous opinions from strangers on big travel sites, never knowing if the glowing 5-star review was genuine or just another paid promotion.
              </p>
              <p>
                As someone who genuinely loves exploring new places with my loved ones, I realized what I actually needed wasn't more reviews—it was <strong className="text-[#3a4d6f]">better reviews from people I trust</strong>. I wanted to hear from my friends who'd actually been there, my family members who know my travel style, and my network of fellow adventurers whose judgment I value.
              </p>
              <p>
                That's when the idea for Tucker Trips was born—<strong className="text-[#ec4899]">a private travel community where real people share real experiences</strong>. No fake reviews. No hidden agendas. Just authentic trip logs, honest recommendations, and reliable advice from your trusted circle. With the right information at hand from people you know, you can focus on creating memories instead of second-guessing every booking.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 md:pt-4 text-[#ec4899]">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              <p className="text-sm sm:text-base font-semibold">In loving memory of Tucker, my loyal travel companion</p>
            </div>
          </div>

          {/* Images - Kristin with Tucker */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src="https://customer-assets.emergentagent.com/job_tucker-trips/artifacts/7algba6y_Screenshot%202025-11-11%20170344.jpg"
              alt="Kristin Stein with Tucker outdoors"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 border-2 border-gray-100"
            />
            <img
              src="https://customer-assets.emergentagent.com/job_tucker-trips/artifacts/nq0qra6v_Screenshot%202025-11-11%20170414.jpg"
              alt="Kristin Stein and Tucker"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 border-2 border-gray-100"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;