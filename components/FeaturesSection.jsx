import React from 'react';
import { BookOpen, Shield, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Travel Journal',
      description: 'Highlights, lowlights, tips—by day or stop.',
      color: '#ec4899'
    },
    {
      icon: Shield,
      title: 'No Anonymous Reviews',
      description: 'Every trip shows who wrote it.',
      color: '#4DB8BA'
    },
    {
      icon: Users,
      title: 'Your Trusted Tribe',
      description: 'Invite family, friends, or teams.',
      color: '#6366f1'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3a4d6f] mb-4 md:mb-6">
            Real trips. Real trust.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 bg-gradient-to-br from-white to-gray-50 group"
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:scale-110" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#3a4d6f] mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;