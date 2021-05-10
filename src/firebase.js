import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyCCWk4OmtXb1jeYn3taLMeDFUEUI-1VdUc",
  authDomain: "fir-test-project-1-636f2.firebaseapp.com",
  databaseURL: "https://fir-test-project-1-636f2-default-rtdb.firebaseio.com",
  projectId: "fir-test-project-1-636f2",
  storageBucket: "fir-test-project-1-636f2.appspot.com",
  messagingSenderId: "112152366163",
  appId: "1:112152366163:web:60e1764aae5901d7688aa6",
  measurementId: "G-LN44ZY2K9F"
};

firebase.initializeApp(config);

export default firebase;