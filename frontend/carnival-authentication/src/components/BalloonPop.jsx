import React, { useState } from 'react'
import Balloon from '../assets/tokens/Balloon.png'
import BalloonPop from '../assets/tokens/BalloonPop.gif'

export default function BalloonPopping ({animalToken, onTokenSelect, tokenDisplay}) {
    const [stage, setStage] = useState('static');

    const handlePop = () => {
        if (stage !== 'static') return; 

        setStage('popping');

        setTimeout(() => {
      setStage('revealed');
      
    }, 900); 
  };


  return (
    <div className="w-24 h-28 flex justify-center items-center">
      {stage === 'static' && (
        <img 
          src={Balloon} 
          alt="Balloon" 
          onClick={handlePop}
          className="w-16 h-24 hover:scale-110 transition-transform cursor-pointer"
        />
      )}
      {stage === 'popping' && (
        <img src={BalloonPop} alt="Popping Balloon" className="w-16 h-24 pointer-events-none" />
      )}
      {stage === 'revealed' && (
        <button 
          type="button"
          onClick={() => onTokenSelect(animalToken)} 
          className="p-0 m-0 bg-transparent border-none outline-none hover:scale-110 transition-transform hover:-translate-y-1 animate-fade-in cursor-pointer"
        >
          <img 
            src={tokenDisplay[animalToken]} 
            alt={animalToken} 
            className="w-34 h-34 object-contain block" 
          />
        </button>
      )}
    </div>
  );

    
}

