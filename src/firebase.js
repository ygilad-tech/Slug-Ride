import * as firebase from "firebase";
import 'firebase/firestore';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAKQst4A-9FrvXDz2IPSnWyufX5iehZcoc",
  authDomain: "slugride-ff4c3.firebaseapp.com",
  databaseURL: "https://slugride-ff4c3.firebaseio.com",
  projectId: "slugride-ff4c3",
  storageBucket: "slugride-ff4c3.appspot.com",
  messagingSenderId: "481232900808",
  appId: "1:481232900808:web:dfcecda79bc9dc93598bfd",
  measurementId: "G-9C8ZTKRHX9"
});

const db = firebaseApp.firestore();

export {firebaseApp};
export {db};
