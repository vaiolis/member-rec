import React, { useCallback } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { initializeFirebase } from '../components/Utils';
import { useNavigate } from 'react-router-dom';

export default function Results(props) {
  // Unfortunately, this is a major security vulnerability in your project. By putting api keys
  // and other authentication secrets in source code, you effectively allow anyone anywhere to make
  // changes to your firebase database. We will fix this once this project is at a place where it is
  // ready to be deployed and hosted on a live server (which will also require us to re-issue api keys
  // and other secrets for this project). Still, I want to call out this vulnerability explicitly here to
  // make it clear that this code chunk here is a severe security issue and needs to be fixed in the future.

  // const { gameData, playerName, setPlayerName } = props;
  // const navigate = useNavigate();
  // const changeName = useCallback(
  //   (username) => {
  //     setPlayerName(username.target.value);
  //   },
  //   [setPlayerName]
  // );
  // const pushPlayerToDB = useCallback(
  //   (playerName, gameData) => {
  //     const db = initializeFirebase();
  //     const scores = doc(db, 'main', 'Leaderboard');
  //     // console.log(playerName + ' helooooo');
  //     updateDoc(scores, {
  //       Scores: arrayUnion({
  //         Name: playerName,
  //         Score: gameData.points,
  //       }),
  //     }).then(navigate('/'));
  //   },
  //   [navigate]
  // );
  // const pushPlayerToDBNoAttrs = useCallback(() => {
  //   pushPlayerToDB(playerName, gameData);
  // }, [playerName, gameData, pushPlayerToDB]);
  return (
    <div className='bg-black text-white h-[100vh] text-center w-[100vw] py-20 px-10'>
      <h1 className="font-bold text-4xl text-blue-700">Scorecard</h1>
      <span className="lg:w-96 border-gray-500 border-2 rounded-lg p-5 bg-gray-900 grid grid-cols-2 grid-rows-3 gap-y-5 my-10 m-auto">
              <div className="">
                <strong>Score</strong>
              </div>
              <div className="text-blue-500">
                <strong>Value</strong>
              </div>
              <div className="">
                <strong>Time</strong>
              </div>
              <div className="text-blue-500">
                <strong>Value</strong>
              </div>
              <div className="">
                <strong>Name</strong>
              </div>
              <div className="">
                <input className='bg-gray-800 border-gray-700 shadow appearance-none border rounded w-full text-white focus:outline-none'></input>
              </div>
              {/* <div className="score">
                <input name="name" onChange={changeName} value={playerName} />
              </div> */}
      </span>
      <button className='rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-900 transition hover:scale-[1.05]'>
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
