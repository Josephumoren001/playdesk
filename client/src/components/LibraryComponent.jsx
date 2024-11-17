import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LibraryComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const categories = ['All', 'Shooting', 'Racing', 'Adventure', 'Classic', 'Others'];

  const games = [
    {
      id: 1,
      title: "Space Shooter",
      image: "https://i.imgur.com/umxlgWi.png",
      category: "Shooting",
      action: "Play Now",
      isAvailable: true
    },
    {
      id: 2,
      title: "Fast Racing",
      image: "https://i.imgur.com/u0znZH3.png",
      category: "Racing",
      action: "Coming Soon",
      isAvailable: false
    },
    {
      id: 3,
      title: "Adventure Quest",
      image: "https://i.imgur.com/pWpMeoJ.png",
      category: "Adventure",
      action: "Coming Soon"
    },
    {
      id: 4,
      title: "Classic Tetris",
      image: "https://i.imgur.com/Ty4PgIB.png",
      category: "Classic",
      action: "Coming Soon"
    },
    {
      id: 5,
      title: "Space Wars",
      image: "https://i.imgur.com/4SRIz8I.png",
      category: "Shooting",
      action: "Coming Soon"
    },
    {
      id: 6,
      title: "Drift King",
      image: "https://i.imgur.com/38iprHi.png",
      category: "Racing",
      action: "Coming Soon"
    },
    {
      id: 7,
      title: "Treasure Hunt",
      image: "https://i.imgur.com/7PNuRlx.png",
      category: "Adventure",
      action: "Coming Soon"
    },
    {
      id: 8,
      title: "Retro Pong",
      image: "https://i.imgur.com/zAo0ywT.png",
      category: "Classic",
      action: "Coming Soon"
    },
    {
      id: 9,
      title: "Zombie Defense",
      image: "https://i.imgur.com/lrlac9y.png",
      category: "Shooting",
      action: "Coming Soon"
    },
    {
      id: 10,
      title: "Circuit Challenge",
      image: "https://i.imgur.com/U0pyUpU.png",
      category: "Racing",
      action: "Coming Soon"
    },
    {
      id: 11,
      title: "Mystery Island",
      image: "https://i.imgur.com/vm2oDyy.png",
      category: "Adventure",
      action: "Coming Soon"
    },
    {
      id: 12,
      title: "Pixel Platformer",
      image: "https://i.imgur.com/awoFF2E.png",
      category: "Classic",
      action: "Coming Soon"
    },
    {
      id: 13,
      title: "Chess Master",
      image: "https://i.imgur.com/XdpsiyR.png",
      category: "Others",
      action: "Coming Soon"
    },
    {
      id: 14,
      title: "Sniper Elite",
      image: "https://i.imgur.com/NiNgiOn.png",
      category: "Shooting",
      action: "Coming Soon"
    },
    {
      id: 15,
      title: "Rally Champion",
      image: "https://i.imgur.com/VnaAgad.png",
      category: "Racing",
      action: "Coming Soon"
    },
    {
      id: 16,
      title: "Dungeon Crawler",
      image: "https://i.imgur.com/cAhyfHd.png",
      category: "Adventure",
      action: "Coming Soon"
    },
    {
      id: 17,
      title: "Anshu Warrior",
      image: "https://i.imgur.com/LaXYD5V.png",
      category: "Classic",
      action: "Coming Soon"
    },
    {
      id: 18,
      title: "Biker Hunt",
      image: "https://i.imgur.com/u0znZH3.png",
      category: "Others",
      action: "Coming Soon"
    },
    {
      id: 19,
      title: "The Strike",
      image: "https://i.imgur.com/Ty4PgIB.png",
      category: "Others",
      action: "Coming Soon"
    }
  ];

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const handlePlayClick = (e, gameId) => {
    e.stopPropagation();
    
    // Check if user is authenticated using Redux state
    if (currentUser) {
      // User is logged in, navigate to game
      navigate(`/game/${gameId}`);
    } else {
      // User is not logged in, navigate to sign-in page
      navigate('/sign-up', { 
        state: { 
          from: `/game/${gameId}`,
          message: "Please sign in to play this game" 
        } 
      });
    }
  };

  return (
    <div className="bg-gray-900 py-16 px-4 md:px-8 lg:px-16 justify-center">
      {/* Section Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
        FIND ENDLESS <span className="text-green-500">EXCITEMENT</span>
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        From classic slots to immersive galaxy shooter and more
      </p>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {filteredGames.map((game) => (
          <div 
            key={game.id} 
            className="relative group aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
          >
            {/* Game Image */}
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
              <h3 className="text-white text-xl font-bold mb-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {game.title}
              </h3>
              
              {/* Play Button */}
              <button 
                onClick={(e) => handlePlayClick(e, game)}
                className={`px-8 py-3 rounded-full transform translate-y-4 
                  group-hover:translate-y-0 transition-transform duration-300
                  shadow-lg ${
                    game.isAvailable 
                      ? 'bg-green-500 text-white hover:bg-green-400 hover:scale-105 active:scale-95 shadow-green-500/30'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed shadow-gray-500/30'
                  }`}
                disabled={!game.isAvailable}
              >
                {game.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryComponent;