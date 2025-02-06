// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { getDatabase,onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCk9IV9rcosKRDXBLHln9Nh8jCxAyYGdWw",
    authDomain: "carpooling-b7fae.firebaseapp.com",
    databaseURL: "https://carpooling-b7fae-default-rtdb.firebaseio.com",
    projectId: "carpooling-b7fae",
    storageBucket: "carpooling-b7fae.firebasestorage.app",
    messagingSenderId: "25794477334",
    appId: "1:25794477334:web:76b0eda6080f4a75d9e437",
    measurementId: "G-0X9G37T2Z6"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); // Removed explicit type definition
  const database = getDatabase(app); // Removed explicit type definition
  

// Export for use in other components
export { app, auth, database,onAuthStateChanged,onValue };
export type { User };