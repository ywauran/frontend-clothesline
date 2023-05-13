// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCZVu3y7zTA641rRrtmuxZmlDNkAohs0A",
  authDomain: "jemuran-pakaian-otomatis.firebaseapp.com",
  databaseURL: "https://jemuran-pakaian-otomatis-default-rtdb.firebaseio.com",
  projectId: "jemuran-pakaian-otomatis",
  storageBucket: "jemuran-pakaian-otomatis.appspot.com",
  messagingSenderId: "779012103880",
  appId: "1:779012103880:web:78a6d6188931d573d0cffd",
  measurementId: "G-2XNGWFPPZ5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
