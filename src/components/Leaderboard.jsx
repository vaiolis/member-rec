import React from 'react';
import './Leaderboard.css';

export default function Leaderboard() {
  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="container">
        <div className="row">
          <div className="name">
            <strong>Name</strong>
          </div>
          <div className="score">
            <strong>Score</strong>
          </div>
        </div>
        <div className="row">
          <div className="name">Player1</div>
          <div className="score">430</div>
        </div>

        <div className="row">
          <div className="name">Player2</div>
          <div className="score">580</div>
        </div>

        <div className="row">
          <div className="name">Player3</div>
          <div className="score">310</div>
        </div>

        <div className="row">
          <div className="name">Player4</div>
          <div className="score">640</div>
        </div>

        <div className="row">
          <div className="name">Player5</div>
          <div className="score">495</div>
        </div>
        <div className="row">
          <div className="name">Player6</div>
          <div className="score">495</div>
        </div>
        <div className="row">
          <div className="name">Player7</div>
          <div className="score">495</div>
        </div>
        <div className="row">
          <div className="name">Player8</div>
          <div className="score">495</div>
        </div>
        <div className="row">
          <div className="name">Player9</div>
          <div className="score">495</div>
        </div>
        <div className="row">
          <div className="name">Player10</div>
          <div className="score">495</div>
        </div>
      </div>
    </div>
  );
}
