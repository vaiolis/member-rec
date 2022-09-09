import React, { useCallback } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import './Results.css';
import PropTypes from 'prop-types';
import { initializeFirebase } from '../components/Utils';
import { useNavigate } from 'react-router-dom';
// import NameForm from '../components/NameForm';

export default function Results(props) {
  // Unfortunately, this is a major security vulnerability in your project. By putting api keys
  // and other authentication secrets in source code, you effectively allow anyone anywhere to make
  // changes to your firebase database. We will fix this once this project is at a place where it is
  // ready to be deployed and hosted on a live server (which will also require us to re-issue api keys
  // and other secrets for this project). Still, I want to call out this vulnerability explicitly here to
  // make it clear that this code chunk here is a severe security issue and needs to be fixed in the future.

  const { gameData, playerName, setPlayerName } = props;
  const navigate = useNavigate();
  const changeName = useCallback(
    (username) => {
      setPlayerName(username.target.value);
    },
    [setPlayerName]
  );
  const pushPlayerToDB = useCallback(
    (playerName, gameData) => {
      const db = initializeFirebase();
      const scores = doc(db, 'main', 'Leaderboard');
      console.log(playerName + ' helooooo');
      updateDoc(scores, {
        Scores: arrayUnion({
          Name: playerName,
          Score: gameData.points,
        }),
      }).then(navigate('/'));
    },
    [navigate]
  );
  const pushPlayerToDBNoAttrs = useCallback(() => {
    pushPlayerToDB(playerName, gameData);
  }, [playerName, gameData, pushPlayerToDB]);
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
                <strong>{gameData.points}</strong>
              </div>
            </div>
            <div className="results-row">
              <div className="name">
                <strong>Name</strong>
              </div>
              <div className="score">
                <input name="name" onChange={changeName} value={playerName} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={pushPlayerToDBNoAttrs}>
        <strong>Submit</strong>
      </button>
    </div>
  );
}
Results.propTypes = {
  gameData: PropTypes.shape({
    officers: PropTypes.array,
    currentGuess: PropTypes.string,
    correctName: PropTypes.string,
    imageUrl: PropTypes.string,
    randList: PropTypes.array,
    index: PropTypes.number,
    points: PropTypes.number,
    lives: PropTypes.number,
  }),
  playerName: PropTypes.string,
  setPlayerName: PropTypes.func,
};
