import { initializeApp } from 'firebase/app';
import { doc ,getDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React from 'react';
import './Question.css';

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
    getDoc(docRef).then((docData) => {
        try {
          console.log(docData);
          data = docData.data();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        officers = data.Officers;
        randList = genRandList(officers.length)
        currImg = officers[randList[index]].ImageUrl;
        console.log(currImg);
        correctName = officers[randList[index]].name;
        document.getElementById("PersonImg").setAttribute("src",currImg);
    });
  }
  function nextQuestion() {
    index++;
    currImg = officers[randList[index]].ImageUrl;
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
  console.log("near return")
  return (<img src="" id = "PersonImg" class = "person-img"></img>);
}

export default Question;
