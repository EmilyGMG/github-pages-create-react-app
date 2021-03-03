import firebase from "firebase/app"
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC3cawlMauPhvyCXvEEejW6_OlqcKGYyjw",
  authDomain: "fir-react-auth-dffc5.firebaseapp.com",
  projectId: "fir-react-auth-dffc5",
  storageBucket: "fir-react-auth-dffc5.appspot.com",
  messagingSenderId: "721981670935",
  appId: "1:721981670935:web:4a2be44da247247252fe52"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;