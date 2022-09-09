import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import NameForm from './NameForm';
import './Question.css';
import { initializeFirebase } from './Utils';
function Question(props) {
  const { gameData, guess, setGameData, setGuess } = props;

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
    console.log('inside');

    // Unfortunately, this is a major security vulnerability in your project. By putting api keys
    // and other authentication secrets in source code, you effectively allow anyone anywhere to make
    // changes to your firebase database. We will fix this once this project is at a place where it is
    // ready to be deployed and hosted on a live server (which will also require us to re-issue api keys
    // and other secrets for this project). Still, I want to call out this vulnerability explicitly here to
    // make it clear that this code chunk here is a severe security issue and needs to be fixed in the future.
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
      });
    });
  }

  function nextQuestion(name) {
    console.log(JSON.stringify(gameData) + ' data');
    console.log(gameData.correctName + ' l ' + name);

    const newGameData = { ...gameData };
    if (gameData.correctName.toLowerCase() == name.toLowerCase()) {
      newGameData.points = newGameData.points + 1;
    } else {
      newGameData.lives = newGameData.lives - 1;
    }

    if (gameData.index < gameData.officers.length - 1) {
      console.log(gameData.randList);
      console.log(gameData.index);
      const newIndex = newGameData.index + 1;
      newGameData.index = newIndex;
      newGameData.correctName = gameData.officers[gameData.randList[newIndex]].Name;
      newGameData.imageUrl = gameData.officers[gameData.randList[newIndex]].ImageUrl;

      setGameData(newGameData);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => initConnection(), []);

  console.log('near return');
  return (
    <div>
      <NameForm name={guess} setName={setGuess} nextQuestion={nextQuestion} />
    </div>
  );
}

Question.propTypes = {
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
  guess: PropTypes.string,
  setGameData: PropTypes.func,
  setGuess: PropTypes.func,
};

export default Question;
