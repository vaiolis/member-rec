import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
/* eslint-disable no-unused-vars */
export const initializeFirebase = () => {
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
  return db;
};
