// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1j8G8iUu3K_YrmYpGVHmpIGJAb-Jr60c",
  authDomain: "todo-app-32852.firebaseapp.com",
  projectId: "todo-app-32852",
  storageBucket: "todo-app-32852.firebasestorage.app",
  messagingSenderId: "131814175428",
  appId: "1:131814175428:web:34b2c1be0666af5b180f91",
  measurementId: "G-5D88HYQ9HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
