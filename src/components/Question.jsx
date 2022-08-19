import { initializeApp } from 'firebase/app';
import { doc ,getDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React from 'react';
import PropTypes from 'prop-types';



function Question(props) {
    console.log("started");
  const firebaseConfig = {
    apiKey: "AIzaSyAktEso_fJ-wePG4AGcRgo2IBezCKq5cJY",
    authDomain: "face-rec-js.firebaseapp.com",
    projectId: "face-rec-js",
    storageBucket: "face-rec-js.appspot.com",
    messagingSenderId: "75624240447",
    appId: "1:75624240447:web:31018c9429dd94db666f8a"
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const db = getFirestore(app);
  var currImg = null;
  var correctName = null;
  var index = 0;
  var data = null;
  var randList;
  var officers;
  function initConnection() {
    const docRef = doc(db,'main','People');
    const doc = getDoc(docRef).then((doc) => {
        try {
            console.log(doc)
            data = doc.data();
        } catch (error) {
            console.log(error);
        }
        officers = data.officers;
        randList = genRandList(officers.length)
        getDownloadURL(ref(storage,officers[randList[index]].ImageUrl)).then((url) => {
        currImg = url;
        });
        correctName = officers[randList[index]].name;
    });
     
    
  }
  function nextQuestion() {
    index++;
    getDownloadURL(ref(storage,officers[randList[index]].ImageUrl)).then((url) => {
      currImg = url;
    });
    correctName = officers[randList[index]].name;
  }
  function genRandList(range) {
    randList = new Array();
    var numList = new Array();
    for(let i = 0; i < range; i++) {
      numList.push(i);
    }
    for(let i = 0; i < range; i++) {
      var randInd = Math.floor(Math.random() * numList.length);
      randList.push(randInd);
      numList.splice(i,1);
    }
    return randList;
  }
  initConnection();

  return <img src={currImg}></img>;
}

Question.propTypes = {
};

export default Question;
