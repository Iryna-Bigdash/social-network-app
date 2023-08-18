// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBYQlx-RiWWdTfsRjaZb2Bub2HEbg992wE",
  authDomain: "socialnetwork-7198b.firebaseapp.com",
  databaseURL: "https://socialnetwork-7198b-default-rtdb.firebaseio.com",
  projectId: "socialnetwork-7198b",
  storageBucket: "socialnetwork-7198b.appspot.com",
  messagingSenderId: "250184094479",
  appId: "1:250184094479:web:a03dd71c644ae20dd4e47a",
  measurementId: "G-LRL6RGSQS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);