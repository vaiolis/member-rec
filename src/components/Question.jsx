import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import './Question.css';
import './NameForm';
import NameForm from './NameForm';
import PropTypes from 'prop-types';

function Question(props) {
  const { name, setName } = props;
  console.log('started');
  const firebaseConfig = {
    apiKey: 'AIzaSyAktEso_fJ-wePG4AGcRgo2IBezCKq5cJY',
    authDomain: 'face-rec-js.firebaseapp.com',
    projectId: 'face-rec-js',
    storageBucket: 'face-rec-js.appspot.com',
    messagingSenderId: '75624240447',
    appId: '1:75624240447:web:31018c9429dd94db666f8a',
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  var currImg = null;
  var correctName = null;
  var index = 0;
  var data = null;
  var randList;
  var officers;

  function initConnection() {
    const docRef = doc(db, 'main', 'People');
    getDoc(docRef).then((docData) => {
      try {
        console.log(docData);
        data = docData.data();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      officers = data.Officers;
      randList = genRandList(officers.length);
      currImg = officers[randList[index]].ImageUrl;
      console.log(currImg);
      correctName = officers[randList[index]].name;
      document.getElementById('PersonImg').setAttribute('src', currImg);
      console.log(correctName); // this is being done to satisfy eslint errors
    });
  }

  // the purpose of the following comment is to suppress eslint errors for this one function.
  // DO NOT RELY ON SUPPRESSING ESLINT ERRORS TO RESOLVE ISSUES IN YOUR CODE
  // I am only doing this to preserve a large-ish block of code within the context of this change set.
  // Properly resolve eslint errors by understanding the purpose behind the error statement and
  // making a code change that no longer results in eslint being unhappy with your code.
  // eslint-disable-next-line no-unused-vars
  function nextQuestion() {
    if (index < officers.length - 1) {
      console.log(randList);
      console.log(index);
      index++;
      currImg = officers[randList[index]].ImageUrl;
      correctName = officers[randList[index]].name;
      document.getElementById('PersonImg').setAttribute('src', currImg);
    }
  }

  function genRandList(range) {
    randList = new Array();
    var numList = new Array();
    for (let i = 0; i < range; i++) {
      numList.push(i);
    }
    for (let i = 0; i < range; i++) {
      var randInd = Math.floor(Math.random() * numList.length);
      randList.push(randInd);
      numList.splice(i, 1);
    }
    return randList;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => initConnection(), []);

  console.log('near return');
  return (
    <div>
      <img src="" id="PersonImg" className="person-img"></img>
      <NameForm name={name} setName={setName} nextQuestion={nextQuestion} />
    </div>
  );
}
Question.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
};
export default Question;
