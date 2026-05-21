import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import CircusSeal from '../assets/CircusSeal.png'
import Cloud from '../assets/Cloud.png'
import HomeIcon from '../assets/HomeIcon.png'
import ProfileIcon from '../assets/ProfileIcon.png'

export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = location.state?.username || 'person';

  const isNewUser = location.state?.isNewUser || false;

  return (
    <div className="min-h-screen bg-[#b2576f] flex flex-col justify-center items-center p-8 font-rye gap-8 overflow-hidden">
      
      <Link
        to="/"
        className="absolute top-6 left-6 hover:scale-110 transition-transform duration-300 z-50"
  
      >
        <div
        className="w-12 h-12 md:w-16 md:h-16 bg-[#062d4c] drop-shadow-lg"
    style={{
      maskImage: `url(${HomeIcon})`,
      WebkitMaskImage: `url(${HomeIcon})`,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center'
      }}
  />
      </Link>

      
      <div className="text-center z-10 flex flex-col items-center gap-6">
        <h1 className="text-[#062d4c] text-6xl md:text-7xl leading-tight drop-shadow-md z-10">
          {isNewUser ? 'Welcome back,' : 'Welcome,'} <br/> 
          <span className="text-white text-7xl md:text-6xl tracking-wider block mt-4 animate-fade-in">
            {userName}!
          </span>
        </h1>

        <p className="text-2xl text-white tracking-wide max-w-2xl mt-4 opacity-90 font-instrument">
          {isNewUser 
            ? "You have successfully logged in!" 
            : "your account has been succesfully created!"}
        </p>

          <div className='absolute inset-0 pointer-events-none z-0'>
        <img 
        src={Cloud}
        className='absolute top-100 opacity-70 w-48 md:w-64 animate-drift-slow'
        />
        <img 
            src={Cloud} 
            className='absolute top-80 opacity-50 w-24 md:w-32 animate-drift-medium' 
            style={{ animationDelay: '-15s' }} 
            alt="Cloud" 
          />
          <img 
            src={Cloud} 
            className='absolute top-70 opacity-60 w-32 md:w-48 animate-drift-fast' 
            style={{ animationDelay: '-5s' }} 
            alt="Cloud" 
          />
          <img 
            src={Cloud} 
            className='absolute top-90 opacity-60 w-32 md:w-48 animate-drift-medium' 
            style={{ animationDelay: '-5s' }} 
            alt="Cloud" 
          />
      </div>

        <img 
          src={CircusSeal} 
        
          className="w-64 my-8 drop-shadow-2xl" 
        />
       
      </div>

    </div>
  );
}