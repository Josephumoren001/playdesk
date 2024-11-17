import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroComponent = () => (
  <div className="relative h-screen w-full">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('https://i.imgur.com/733aiSL.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
    </div>
    
    <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
        OVER <span className="text-green-500 font-extrabold">100+ GAMES</span> ONLINE
        <br />SIGN UP TO PLAY
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8">
        when learning ceases, aging begins!
      </p>
      <button className="flex items-center gap-2  border-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-bold">
        Join Now <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default HeroComponent;