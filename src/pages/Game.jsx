import React, { useState } from 'react';
//import NameForm from '../components/NameForm';
import Question from '../components/Question';
import logo from '../assets/fblalogo.png';

// import './Game.css';
import Results from './Results';
const initialDataState = {
  officers: [],
  correctName: '',
  imageUrl: '',
  randList: [],
  index: 0,
  points: 0,
  lives: 3,
};

export default function Game() {

  const [guess, setGuess] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [gameData, setGameData] = useState(initialDataState);

  if (gameData.lives > 0) {
    return (
      <>
        <div className='bg-black text-white lg:h-[100vh] py-10'>
          <div className="grid gap-4 lg:grid-cols-2 grid-cols-2">
            <div className="text-center">
              <h1 className='font-bold text-4xl text-blue-700'>Lives</h1>
              <h2 className='font-semibold text-4xl text-white'>{gameData.lives}</h2>
            </div>
            <div className="text-center">
              <h1 className='font-bold text-4xl text-blue-700'>Score</h1>
              <h2 className='font-semibold text-4xl text-white'>{gameData.points}</h2>
            </div>
          </div>
          <div className='flex justify-center'>
            <img src={logo} className="object-cover h-96 w-96" />
          </div>
          <div className="grid lg:grid-cols-2 grid-rows-2 gap-4 grid-cols-1 my-5 mx-10">
            
              <div className="border-white border-2 rounded-lg p-5 bg-gray-900 hover:bg-gray-600"></div>
              <div className="border-white border-2 rounded-lg p-5 bg-gray-900 hover:bg-gray-600"></div>
            
              <div className="border-white border-2 rounded-lg p-5 bg-gray-900 hover:bg-gray-600"></div>
              <div className="border-white border-2 rounded-lg p-5 bg-gray-900 hover:bg-gray-600"></div>
           
          </div>
        </div>
        
      </>
      
    );
  } else {
    return <Results gameData={gameData} playerName={playerName} setPlayerName={setPlayerName} />;
  }
}
