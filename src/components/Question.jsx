import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import './Question.css';
import './NameForm';
import NameForm from './NameForm';
import PropTypes from 'prop-types';

function Question(props) {
  const { name, setName } = props;

  function initData() {
    console.log('started');
    const data = {
      officers: [],
      correctName: '',
      currImg: '',
      randList: [],
      index: 0,
      points: 0,
    };
    window.localStorage.setItem('persistentData', JSON.stringify(data));
    console.log(JSON.stringify(data));
  }
  function setData(jsonObj) {
    window.localStorage.setItem('persistentData', JSON.stringify(jsonObj));
  }
  function readData() {
    return JSON.parse(window.localStorage.getItem('persistentData'));
  }
  function initConnection() {
    console.log('inside');
    initData();
    const data = readData();
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
    data.index = 0;
    const docRef = doc(db, 'main', 'People');
    getDoc(docRef).then((docData) => {
      data.officers = docData.data().Officers;
      data.randList = genRandList(data.officers.length);
      data.currImg = data.officers[data.randList[data.index]].ImageUrl;
      data.correctName = data.officers[data.randList[data.index]].Name;
      document.getElementById('PersonImg').setAttribute('src', data.currImg);
      console.log(data.correctName); // this is being done to satisfy eslint errors
      setData(data);
    });
  }

  // the purpose of the following comment is to suppress eslint errors for this one function.
  // DO NOT RELY ON SUPPRESSING ESLINT ERRORS TO RESOLVE ISSUES IN YOUR CODE
  // I am only doing this to preserve a large-ish block of code within the context of this change set.
  // Properly resolve eslint errors by understanding the purpose behind the error statement and
  // making a code change that no longer results in eslint being unhappy with your code.
  // eslint-disable-next-line no-unused-vars
  function nextQuestion(name) {
    const data = readData();
    console.log(JSON.stringify(data) + ' data');
    console.log(data.correctName + ' l ' + name);
    if (data.correctName.toLowerCase() == name.toLowerCase()) {
      data.points++;
      setData(data);
      console.log(JSON.stringify(readData()) + ' readData');
    }
    if (data.index < data.officers.length - 1) {
      console.log(data.randList);
      console.log(data.index);
      data.index++;
      data.currImg = data.officers[data.randList[data.index]].ImageUrl;
      data.correctName = data.officers[data.randList[data.index]].Name;
      document.getElementById('PersonImg').setAttribute('src', data.currImg);
      setData(data);
    }
  }

  function genRandList(range) {
    var randList = new Array();
    var numList = new Array();
    for (let i = 0; i < range; i++) {
      numList.push(i);
    }
    console.log(numList);
    for (let i = 0; i < range; i++) {
      var randInd = Math.floor(Math.random() * numList.length);
      randList.push(numList[randInd]);
      numList.splice(randInd, 1);
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
