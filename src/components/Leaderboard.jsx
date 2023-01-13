import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '../models/utils';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const db = initializeFirebase();
  const docRef = doc(db, 'main', 'Leaderboard');
  const [listItems, setItems] = useState(null);
  useEffect(() => {
    getDoc(docRef).then((docData) => {
    const list = docData.data().Scores.sort((a, b) => b.Score - a.Score);
    const topTen = list.slice(0, 10);
      setItems(
       topTen.map((entry, index) => (
              <>
                <div className="grid grid-cols-3 align-middle self-center" key={index}>
                  <div className="text-lg my-5 text-purple-300 text-left">{entry.Name}</div>
                  <div className="text-lg my-5 text-purple-300 text-right">{entry.Score}</div>
                  <div className="text-lg my-5 text-purple-300 text-right">{entry.Level}</div>
                </div>
                <hr className="h-px bg-gray-200 border-0 border-dotted dark:bg-gray-500"></hr>
              </>
            ))
        
      );
    });
  }, [docRef]);

  return (
    <div className="px-10 py-14">
      <h1 className='font-bold text-2xl text-blue-700'>Leaderboard</h1>
      <div className="grid grid-cols-3 align-middle self-center">
        <div className="font-bold text-lg text-purple-500 my-5 text-left">Name</div>
        <div className="font-bold text-lg text-blue-500 my-5 text-right">Score</div>
        <div className="font-bold text-lg text-orange-500 my-5 text-right">Level</div>
      </div>
      {listItems}
    </div>
  );
}
