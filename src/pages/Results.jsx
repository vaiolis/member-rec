import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { initializeFirebase } from '../models/utils';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Results() {
  const location = useLocation()
  // console.log(params)
  // console.log(params.get('score'))
  // console.log(atob(balls))
  // console.log(atob(location.search))
  const params = new URLSearchParams((atob(location.search.substring(1, location.search.length))))
  const score = params.get('score')
  const level = params.get('level')
  // const score = 7
  // const level = 7
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const nameSubmit = (name) => {
    const db = initializeFirebase();
    const scores = doc(db, 'main', 'Leaderboard');
    updateDoc(scores, {
      Scores: arrayUnion({
        Name: name,
        Score: score,
        Level: level
      }),
    }).then(navigate('/'));
  }

  return (
    <div className='bg-black text-white h-[100vh] text-center w-[100vw] py-20 px-10'>
      <h1 className="font-bold text-4xl text-blue-700">Scorecard</h1>
      <span className="lg:w-96 border-gray-500 border-2 rounded-lg p-5 bg-gray-900 grid grid-cols-2 grid-rows-3 gap-y-5 my-10 m-auto">
              <div className="">
                <strong>Score</strong>
              </div>
              <div className="text-blue-500">
                <strong>{score}</strong>
              </div>
              <div className="">
                <strong>Level</strong>
              </div>
              <div className="text-blue-500">
                <strong>{level}</strong>
              </div>
              <div className="">
                <strong>Name</strong>
              </div>
              <div className="">
                <input 
                  className='bg-gray-800 border-gray-700 shadow appearance-none border rounded w-full text-white focus:outline-none'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
      </span>
      <button onClick={() => nameSubmit(name)} className='rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-900 transition hover:scale-[1.05]'>
        <strong>Submit</strong>
      </button>
    </div>
  );
}
