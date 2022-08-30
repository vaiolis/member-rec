import React, { useState } from 'react';
//import NameForm from '../components/NameForm';
import Question from '../components/Question';
import './Game.css';
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
      <div className="Game">
        <div className="game-comps">
          <div className="lives">
            <h1>Lives</h1>
            <h2>{gameData.lives}</h2>
          </div>
          <img src={gameData.imageUrl} id="PersonImg" className="person-img" />
          <div className="current-score">
            <h1>Score</h1>
            <h2>{gameData.points}</h2>
          </div>
        </div>
        <img src={gameData.imageUrl} id="PersonImg" className="mobile-person-img" />
        <Question gameData={gameData} guess={guess} setGameData={setGameData} setGuess={setGuess} />
      </div>
    );
  } else {
    return <Results gameData={gameData} playerName={playerName} setPlayerName={setPlayerName} />;
  }
}
