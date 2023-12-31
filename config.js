import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
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

// const firebaseConfig = {
//   apiKey: "AIzaSyDY-B4DsaUKPTljAqBz63aN3-K1WtCjIbQ",
//   authDomain: "qqqqq-371e3.firebaseapp.com",
//   databaseURL: "https://qqqqq-371e3-default-rtdb.firebaseio.com",
//   projectId: "qqqqq-371e3",
//   storageBucket: "qqqqq-371e3.appspot.com",
//   messagingSenderId: "582572723270",
//   appId: "1:582572723270:web:52726cd8295cb39fa30e47",
//   measurementId: "G-T7G7SXFC67"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);