import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthCart from '../assets/AuthCart.png'
import BalloonPopping from '../components/BalloonPop'
import HomeIcon from '../assets/HomeIcon.png'
import BinIcon from '../assets/BinIcon.png'

//tokens
import DuckToken from '../assets/tokens/DuckToken.png'
import PolarBearToken from '../assets/tokens/PolarBearToken.png'
import RaccoonToken from '../assets/tokens/RaccoonToken.png'
import RedPandaToken from '../assets/tokens/RedPandaToken.png'
import SealToken from '../assets/tokens/SealToken.png'
import TriceratopsToken from '../assets/tokens/TriceratopsToken.png'

export default function AuthenticationPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(location.state?.forceLogin || false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tokenPattern, setTokenPattern] = useState([]);

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmPattern, setConfirmPattern] = useState([]);

  const availableTokens = ['duck', 'polar-bear', 'raccoon', 'red-panda', 'seal', 'triceratops'];

  const tokenDisplay = {
    duck: DuckToken,
    'polar-bear': PolarBearToken,
    raccoon: RaccoonToken,
    'red-panda': RedPandaToken,
    seal: SealToken,
    triceratops: TriceratopsToken
  };

  const handleTokenClick = (token) => {
    if (isConfirming) {
      if (confirmPattern.length < 12) setConfirmPattern([...confirmPattern, token]);
    } else {
      if (tokenPattern.length < 12) setTokenPattern([...tokenPattern, token]);
    }
  };

  const handleRemoveToken = (indexToRemove) => {
    if (isConfirming) {
      setConfirmPattern(confirmPattern.filter((_, index) => index !== indexToRemove));
    } else {
      setTokenPattern(tokenPattern.filter((_, index) => index !== indexToRemove));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setTokenPattern([]);
    setConfirmPattern([]);
    setIsConfirming(false);
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (isLogin) {
      if (tokenPattern.length < 6) return setMessage({ text: 'Pattern must be at least 6 tokens', type: 'error' });

      try {
        console.log("Sending to server:", { username, tokenPattern });
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, tokenPattern })
        });
        const data = await response.json();

        if (response.ok) {
         navigate('/welcome', { state: { username: username, isNewUser: true } });
        } else {
          setMessage({ text: data.message, type: 'error' });
        }
      } catch (err) {
        setMessage({ text: 'Server error. Is the backend running?', type: 'error' });
      }
    }
    else {
      if (!isConfirming) {
        if (tokenPattern.length < 6) return setMessage({ text: 'Pattern must be at least 6 tokens', type: 'error' });
        setIsConfirming(true);
        return;
      }
      if (tokenPattern.join('-') !== confirmPattern.join('-')) {
        return setMessage({ text: 'Patterns do not match. Try again.', type: 'error' });
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, tokenPattern })
        });
        const data = await response.json();

        if (response.ok) {
          navigate('/welcome', { state: { username: username } });
        } else {
          setMessage({ text: data.message, type: 'error' });
        }
      } catch (err) {
        setMessage({ text: 'Server error. Is the backend running?', type: 'error' });
      }
    }
  };
  const activePattern = isConfirming ? confirmPattern : tokenPattern;

  return (
    <div className="relative min-h-screen bg-[#b2576f] text-white flex justify-center items-center p-8 font-instrument">


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

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12 mt-8 md:mt-0">


        

        <div className="w-full md:w-3/5 flex flex-col gap-6">

          <div className="text-center md:text-center mb-2">
            <h1 className="text-6xl tracking-wide mb-2 text-[#bfb5cc] font-rye uppercase">{isLogin ? 'Welcome back' : 'Join the carnival'}</h1>
            <p className="text-2xl opacity-90 tracking-wider">
              {isLogin ? 'Log into your account' : 'Sign up to create an account'}
            </p>
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-center ${message.type === 'error' ? 'bg-red-500/80' : 'bg-green-500/80'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            
              <div className="w-full flex flex-col gap-1">
              <label className="text-2xl tracking-wide text-[#062d4c]">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#b4daf9]/50 rounded-xl h-10 px-3 text-[#282130] outline-none focus:ring-2 focus:ring-[#062d4c]"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="w-full flex flex-col gap-1">
                <label className="text-2xl tracking-wide text-[#062d4c]">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#b4daf9]/50 rounded-xl h-10 px-3 text-[#282130] outline-none focus:ring-2 focus:ring-[#062d4c]"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="w-full flex flex-col gap-2 mt-4 ">
              <label className="text-2xl tracking-wide text-[#062d4c]">
                {isConfirming ? "Confirm your pattern:" : "Pattern password:"}
              </label>
              <p className='text-[#062d4c]'>Pop the balloons to reveal tokens, choose 6-12 tokens and create your own secret pattern (password). Tokens can be repeated.</p>

              <div className="flex justify-between items-center bg-[#b4daf9]/30  p-4 rounded-xl mb-2">
                {availableTokens.map((token, index) => (
                  <BalloonPopping
                    key={`${index}-${isLogin}`}
                    animalToken={token}
                    tokenDisplay={tokenDisplay}
                    onTokenSelect={handleTokenClick}
                  />
                ))}
              </div>

              <div className="w-full min-h-[120px] h-auto border-4 border-dashed border-[#703344] rounded-xl bg-[#b4daf9]/30 flex flex-wrap content-start p-3 gap-3">
                {activePattern.length === 0 ? (
                  <span className="opacity-50 italic mx-auto">Your pattern will appear here...</span>
                ) : (
                  activePattern.map((token, index) => (
                    <div key={index}
                      onClick={() => handleRemoveToken(index)} className="relative group p-2 rounded-lg flex-shrink-0 cursor-pointer transition-all hover:scale-105"

  >
                      <img
                        src={tokenDisplay[token]}
                        alt={token}
                        className="w-24 h-28 object-contain pointer-events-none transition-opacity group-hover:opacity-50"
                      />
                      <div 
      className="absolute -top-1 -right-1 w-7 h-7 bg-[#881b28] drop-shadow-md md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:scale-110"
      style={{
        maskImage: `url(${BinIcon})`,
        WebkitMaskImage: `url(${BinIcon})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        }}
   
    />
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-1/3 mx-auto bg-[#282130] text-[#bfb5cc]  text-2xl py-3 rounded-xl hover:bg-[#bfb5cc] hover:text-[#282130] transition-colors shadow-lg"
            >
              {isLogin ? 'Log In' : (isConfirming ? 'Confirm & Sign Up' : 'Sign Up')}
            </button>
          </form>
          <button onClick={toggleAuthMode} className="text-md opacity-70 hover:opacity-100 underline text-center mt-2 uppercase tracking-wide text-[#062d4c]">
            {isLogin ? "Need an account? Sign up." : "Already have an account? Log in."}
          </button>
        </div>
      </div>
    </div>
  );
}