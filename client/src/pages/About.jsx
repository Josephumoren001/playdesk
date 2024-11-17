import MainHero from '../components/MainHero';
import youtube2 from '../assets/aboutbanner.png'
import Deckhouse from '../assets/storyimg.png';
import { Link } from 'react-router-dom';
import VisionMission from '../components/VisionMission';

import DeskCommunities from '../components/DeskCommunities';
import Founders from '../components/Founders';



const About = () => {

    return (
      <div>
        <MainHero>
        <div className="flex flex-col lg:flex-row justify-between text-gray-700 dark:text-white py-5 lg:py-20">
        <div className=" py-12 flex-1 ">
          <div className="flex gap-3 items-center">
              <p className="text-[#10CC6F] text-[1.2rem] lg:text-[1.5rem] font-bold">About</p>

          </div>
          <h1 className="text-[2.5rem] lg:text-[3.75rem] font-extrabold ">PlayDesk</h1>
          <p className="text-[1.375rem]">
          PlayDesk is an innovative gaming library that brings together a vast collection of games under one roof. Designed for gamers, by gamers, PlayDesk is the perfect destination for anyone looking to explore, play, and enjoy their favorite games.

          </p>
          <div className="py-16 flex gap-3">
            <Link to='/library' className='bg-[#10CC6F] rounded-[0.3125rem] text-[0.875rem] font-bold px-[1.25rem] py-[0.625rem] hover:border border-[#10CC6F] hover:bg-transparent text-white'>
             Play Now
            </Link>
            
          </div>
        </div>
       
        <div className="py-12">
           <div className=" w-full lg:w-[28.9375rem] h-[20.75rem] flex items-center justify-center">
            <img src={youtube2} />
           </div>

        </div>
      </div>
        </MainHero>

   


       
       
      </div>
    );
  };
  
  export default About; 

  