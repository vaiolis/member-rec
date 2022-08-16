import React from 'react';
import NameForm from '../components/NameForm';
import './Game.css';

export default function Game() {
  return (
    <div className="Game">
      <div className="game-comps">
        <div className="lives">
          <h1>Lives</h1>
          <h2>3</h2>
        </div>
        <div className="image" />
        <div className="current-score">
          <h1>Score</h1>
          <h2>7</h2>
        </div>
      </div>
      <div className="mobile-image" />
      <div>
        <NameForm />
      </div>
    </div>
  );
}
