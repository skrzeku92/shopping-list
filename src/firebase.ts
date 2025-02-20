// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ8kNjyl3zPnsD3CsN7nzQYvwNDLouUc4",
  authDomain: "shopping-list-5146c.firebaseapp.com",
  projectId: "shopping-list-5146c",
  storageBucket: "shopping-list-5146c.firebasestorage.app",
  messagingSenderId: "472510371778",
  appId: "1:472510371778:web:9df4e057bca8ea304d685b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app, getAuth}