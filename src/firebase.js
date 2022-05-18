// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firebase-firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUZp5Cq4xqH0OL8FoKH-bJSHBqYhQIjMU",
  authDomain: "crud-react-47e74.firebaseapp.com",
  databaseURL: "https://crud-react-47e74-default-rtdb.firebaseio.com",
  projectId: "crud-react-47e74",
  storageBucket: "crud-react-47e74.appspot.com",
  messagingSenderId: "302608357847",
  appId: "1:302608357847:web:83f221363877f4cb945392",
  measurementId: "G-3ZSH9HV910"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}
