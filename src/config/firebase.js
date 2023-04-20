
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBeaUKDY1nITKNgcvqfczkzTnKTtEO0uTE",
  authDomain: "fir-react-course-798e7.firebaseapp.com",
  projectId: "fir-react-course-798e7",
  storageBucket: "fir-react-course-798e7.appspot.com",
  messagingSenderId: "897836742684",
  appId: "1:897836742684:web:ca27b2b8c06e46958947d9",
  measurementId: "G-57YLBDF6HB"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);