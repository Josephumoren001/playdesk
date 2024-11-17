import React from 'react'
import gameOne from '../assets/galaxyshoot.jpg'
import { Link } from 'react-router-dom';

const GamePage = () => {

  const games = [
    {
      id: 1,
      title: "Space Shooter",
      image: "https://i.imgur.com/umxlgWi.png",
      category: "Shooting",
      action: "Play Now",
      description: "Experience an epic space battle in this action-packed shooter game.",
      isAvailable: true,
      gameUrl: "https://example.com/space-shooter"
    },
    // ... other games
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${gameOne})` }}
      >
        <Link to='https://masteroflogic1.github.io/GalaxySpaceShooter/'
         
          className="bg-green-500 text-white px-8 py-3 rounded-full
            hover:bg-green-400 transition-all duration-300
            shadow-lg shadow-green-500/30"
        >
          Play Now
        </Link>
      </div>

      <div className="max-w-6xl mx-auto py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Galaxy Space Shooting</h1>
            <p className="text-gray-300">Experience an epic space battle in this action-packed shooter game.</p>
          </div>
          <Link  to='https://masteroflogic1.github.io/GalaxySpaceShooter/'
            className="bg-green-500 text-white px-8 py-3 rounded-full
              hover:bg-green-400 transition-all duration-300
              shadow-lg shadow-green-500/30"
          >
            Play Now
          </Link>
        </div>

        {/* Game Detail goes here */}
        <div className="bg-black rounded-lg shadow-lg p-8">
          <p className="text-gray-500 mb-2">Rating: 6.5 (40.20 votes)</p>
          <p className="text-gray-500 mb-2">Developer: Deskstones</p>
          <p className="text-gray-500 mb-2">Released: October, 2024</p>
          <p className="text-gray-500 mb-2">Technology: HTML5</p>
          <p className="text-gray-500 mb-2">Platform: Browser</p>
          <p className="text-gray-500 mb-2">Classification: Games - Shooting</p>
          <h2 className="text-xl text-white font-bold mt-6">Features</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li className='text-gray-300'>2D graphics and cool animations</li>
            <li className='text-gray-300'>Hundreds of thrilling missions</li>
            <li className='text-gray-300'>Tons of weapons</li>
          </ul>
          <h2 className="text-xl text-white font-bold mt-6">Controls</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Mouse-scroll = zoom in/out</li>
            <li>Drag left-click = aim</li>
            <li>Right-click = shoot</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GamePage;
