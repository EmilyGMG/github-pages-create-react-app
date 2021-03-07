import firebase from "firebase/app"
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDmVGL1caK--_AJgTWJzO4v2jJzmB0Kma4",
  authDomain: "crud-reactjs-com-reactna-70e26.firebaseapp.com",
  projectId: "crud-reactjs-com-reactna-70e26",
  storageBucket: "crud-reactjs-com-reactna-70e26.appspot.com",
  messagingSenderId: "487641496947",
  appId: "1:487641496947:web:5171d28118bba10fe75906"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;