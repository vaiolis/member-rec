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
    // It seems to me that this data is intended to initialize the state of the Question component from the
    // results of the firebase query. Given that interpretation, I'll assert that the state only needs to
    // exist within the lifecycle of this component. We can use React's useState hook to keep track of this
    // state and have our component's render behavior "react" to the changes of this "data" state.
    // You may want to store data in `window.localStorage` for state that needs to persist between sessions
    // (for example, saving the user's name when they leave the page and come back). But that's not the
    // case here, so I'll be refactoring this in the next commit.
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

    // Unfortunately, this is a major security vulnerability in your project. By putting api keys
    // and other authentication secrets in source code, you effectively allow anyone anywhere to make
    // changes to your firebase database. We will fix this once this project is at a place where it is
    // ready to be deployed and hosted on a live server (which will also require us to re-issue api keys
    // and other secrets for this project). Still, I want to call out this vulnerability explicitly here to
    // make it clear that this code chunk here is a severe security issue and needs to be fixed in the future.
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

  // We no longer need to suppress the eslint warning about no-unused-vars because the `name` variable
  // is now properly being referenced and used in this function. So that means we can delete the prior comment.
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

  // The prevailing syntax in this file for defining functions is a bit outdated and
  // prone to causing unexpected scoping issues. I'll be refactoring this method in the
  // next commit to provide an example of how to write this function in a more modern way
  // according to React best practices.
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
