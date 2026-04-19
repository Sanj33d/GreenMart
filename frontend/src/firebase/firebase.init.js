// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvLw6ivi52ZG6VbjLcCheNo7Q4R8BrtSA",
  authDomain: "greenmart-44b85.firebaseapp.com",
  projectId: "greenmart-44b85",
  storageBucket: "greenmart-44b85.firebasestorage.app",
  messagingSenderId: "245703737391",
  appId: "1:245703737391:web:732552050e91acb06a86da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);