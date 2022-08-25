import React from 'react';
import './Results.css';
// import NameForm from '../components/NameForm';

export default function Results() {
  return (
    <div>
      <h1 className="header">Your Scorecard</h1>
      <div className="results">
        <div className="results-card">
          <div className="results-container">
            <div className="results-row">
              <div className="name">
                <strong>Score</strong>
              </div>
              <div className="score">
                <strong>###</strong>
              </div>
            </div>
            <div className="results-row">
              <div className="name">
                <strong>Enter your Name</strong>
              </div>
              <div className="score">
                <input name="name"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="score-submit">Submit!</button>
    </div>
  );
}
