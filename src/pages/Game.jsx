import React, { useState } from 'react';
//import NameForm from '../components/NameForm';
import Question from '../components/Question';
import './Game.css';

export default function Game() {
  const [name, setName] = useState('');

  return (
    <div className="Game">
      {name && <h1 className="player-name">Player Name: {name}</h1>}
      <div className="game-comps">
        <div className="lives">
          <h1>Lives</h1>
          <h2>3</h2>
        </div>
        <Question name={name} setName={setName} />
        <div className="current-score">
          <h1>Score</h1>
          <h2>7</h2>
        </div>
      </div>
      <div className="mobile-image" />
    </div>
  );
}
