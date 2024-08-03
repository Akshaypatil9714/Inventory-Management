// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Firestore, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT88snXD0nUvDkuVxT5idxIQ3RTrI3c9k",
  authDomain: "inventory-management-92e42.firebaseapp.com",
  projectId: "inventory-management-92e42",
  storageBucket: "inventory-management-92e42.appspot.com",
  messagingSenderId: "1048822646069",
  appId: "1:1048822646069:web:c7dad8d45ffef21c03f87c",
  measurementId: "G-60VZRJL19J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export{firestore}