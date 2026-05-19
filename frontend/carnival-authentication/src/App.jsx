import React from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

import CarnivalTent from './assets/CarnivalTent.png'
import CarnivalTicket from './assets/CarnivalTicket.png'
import Cloud from './assets/Cloud.png'

function App() {
 
  return (
    <>
    <div className='relative min-h-screen bg-[radial-gradient(circle_at_center,_#b4daf9_0%,_#062d4c_100%)] flex flex-col md:flex-row items-center justify-center font-instrument 
    md:gap-24 p-8 overflow-hidden'>

      <div className='absolute inset-0 pointer-events-none z-0'>
        <img 
        src={Cloud}
        className='absolute top-10 opacity-70 w-48 md:w-64 animate-drift-slow'
        />
        <img 
            src={Cloud} 
            className='absolute top-40 opacity-50 w-24 md:w-32 animate-drift-medium' 
            style={{ animationDelay: '-15s' }} 
            alt="Cloud" 
          />
          <img 
            src={Cloud} 
            className='absolute top-2/3 opacity-60 w-32 md:w-48 animate-drift-fast' 
            style={{ animationDelay: '-5s' }} 
            alt="Cloud" 
          />
          <img 
            src={Cloud} 
            className='absolute top-30 opacity-60 w-32 md:w-48 animate-drift-medium' 
            style={{ animationDelay: '-5s' }} 
            alt="Cloud" 
          />
      </div>

      
    <div className='absolute top-15 left-12 md:top-15 md:left-[15%] lg:left-[15%] flex flex-col items-center gap-2'>
      <h1 className='text-[#881b28] text-6xl md:text-6xl leading-tight text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'>
        Welcome to <br />the carnival!
      </h1>
      <img 
        src={CarnivalTicket}
        className='w-48 md:w-56 -rotate-6'
        />
    </div>

    <div className='flex items-center justify-center'>
      <div className='relative cursor-pointer'>
        <img 
        src={CarnivalTent}
        className='w-[550px] md:w-[630px]'
        />
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            click to enter
          </p>
      </div>
    </div>

    

    </div>
     
    </>
  )
}

export default App
