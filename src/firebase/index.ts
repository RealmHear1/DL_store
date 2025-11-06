import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlnQhT4bAq_fqTr9mDLMMi6vipDpkUhBo",
  authDomain: "dl-market-55074.firebaseapp.com",
  projectId: "dl-market-55074",
  storageBucket: "dl-market-55074.appspot.com", // ⚠️ тут у тебя было ".firebasestorage.app" — ошибка
  messagingSenderId: "389405464300",
  appId: "1:389405464300:web:210cdfc674369978c2f7c9",
  measurementId: "G-FHY1G029SK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
