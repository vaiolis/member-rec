import React from 'react';
import './Leaderboard.css';
import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from './Utils';
import { useState } from 'react';
export default function Leaderboard() {
  const db = initializeFirebase();
  const docRef = doc(db, 'main', 'Leaderboard');
  const [listItems, setItems] = useState(null);
  getDoc(docRef).then((docData) => {
    const list = docData.data().Scores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
    setItems(
      list.map((entry, index) => (
        <div className="row" key={index}>
          <div className="name">{entry.Name}</div>
          <div className="score">{entry.Score}</div>
        </div>
      ))
    );
    console.log(listItems);
  });
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
        {listItems}
      </div>
    </div>
  );
}
