import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkc5ij2WFcrEAg4h-AINAgjanG6GtMn4U",
  authDomain: "book-store-1-a9fcc.firebaseapp.com",
  projectId: "book-store-1-a9fcc",
  storageBucket: "book-store-1-a9fcc.appspot.com",
  messagingSenderId: "626302651085",
  appId: "1:626302651085:web:7c05e88549f36911a03784"
};

firebase.initializeApp(firebaseConfig);

export default firebase;