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
    const list = docData.data().Scores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
    const topTen = list.slice(0, 10);
      setItems(
        topTen.map((entry, index) => (
          <>
            <div className="grid grid-cols-2" key={index}>
              <div className="text-lg my-5">{entry.Name}</div>
              <div className="text-lg my-5">{entry.Score}</div>
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
        {listItems}
    </div>
  );
}