import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeFirebase } from '../models/utils';

function Game(props) {
  const [gameData, setGameData] = useState({});
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();
  const genRandList = useCallback((range) => {
  const randList = [];
  const numList = [];

    for (let i = 0; i < range; i++) {
      numList.push(i);
    }

    for (let i = 0; i < range; i++) {
      const randInd = Math.floor(Math.random() * numList.length);
      randList.push(numList[randInd]);
      numList.splice(randInd, 1);
    }

    return randList;
  }, []);

  function initConnection() {
    const db = initializeFirebase();
    const docRef = doc(db, 'main', 'People');
    getDoc(docRef).then((docData) => {
      const index = 0;
      const officers = docData.data().Officers;
      const randList = genRandList(officers.length);

      setGameData({
        ...gameData,
        index,
        officers,
        randList,
        correctName: officers[randList[index]].Name,
        imageUrl: officers[randList[index]].ImageUrl,
        points: 0,
        lives: 3,
      });
    });
  }

  function nextQuestion(name) {
    const newGameData = { ...gameData };
    if (gameData.correctName.toLowerCase() === name.toLowerCase()) {
      newGameData.points += 1;
    } else {
      newGameData.lives -= 1;
    }

    if (gameData.index < gameData.officers.length - 1) {
      const newIndex = newGameData.index + 1;
      newGameData.index = newIndex;
      newGameData.correctName = gameData.officers[gameData.randList[newIndex]].Name;
      newGameData.imageUrl = gameData.officers[gameData.randList[newIndex]].ImageUrl;
    } else {
      newGameData.level += 1;
      setLevel(level + 1);
      newGameData.index = 0;
      newGameData.randList = genRandList(gameData.officers.length);
      newGameData.correctName = gameData.officers[gameData.randList[0]].Name;
      newGameData.imageUrl = gameData.officers[gameData.randList[0]].ImageUrl;
    }

    setGameData(newGameData);
  }


  useEffect(() => {
    initConnection();
  }, [genRandList]);

  if (!gameData.officers) {
    return null;
  }

  const names = [gameData.correctName];

  while (names.length < 4) {
    const incorrectName = gameData.officers[Math.floor(Math.random() * gameData.officers.length)].Name;
    if (!names.includes(incorrectName)) {
      names.push(incorrectName);
    }
  }

  const handleClick = (e) => {
    const name = e.target.innerText;
    nextQuestion(name);
  };

  const shuffledNames = names.sort(() => Math.random() - 0.5);

  const nameDivs = shuffledNames.map((name, index) => {
    return (
      <div onClick={handleClick} key={index} className="hover:scale-[1.03] transition ease-linear-1000 border-white border-2 rounded-lg p-5 bg-gray-900 hover:bg-gray-600">
        {name}
      </div>
    );
  });

  if (gameData.lives === 0) {
    navigate(`/results?${btoa(`score=${gameData.points}&level=${level + 1}`)}`);
  }

  const blurFactor = level * 5;

  return (
    <div className='bg-black text-white lg:h-[100vh] py-10 '>
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-3 mb-10">
        <div className="text-center">
          <h1 className='font-bold text-2xl text-blue-700'>Lives</h1>
          <h2 className='font-semibold text-4xl text-white'>{gameData.lives}</h2>
        </div>
        <div className="text-center">
          <h1 className='font-bold text-2xl text-blue-700'>Level</h1>
          <h2 className='font-semibold text-4xl text-white'>{level + 1}</h2>
        </div>
        <div className="text-center">
          <h1 className='font-bold text-2xl text-blue-700'>Score</h1>
          <h2 className='font-semibold text-4xl text-white'>{gameData.points}</h2>
        </div>
      </div>
      <div style={{filter: `blur(${blurFactor}px)`}} className={`flex justify-center mb-10`}>
        <img alt="Member" src={gameData.imageUrl} className={`object-cover h-96 w-96`} />
      </div>
      <div className="grid lg:grid-cols-2 grid-rows-2 gap-4 grid-cols-1 my-5 mx-10">
        {nameDivs}
      </div>
    </div>
  );
}

Game.propTypes = {
  gameData: PropTypes.shape({
    index: PropTypes.number,
    officers: PropTypes.array,
    randList: PropTypes.array,
    correctName: PropTypes.string,
    imageUrl: PropTypes.string,
    points: PropTypes.number,
    lives: PropTypes.number,
  }),
  setGameData: PropTypes.func,
};

export default Game;