import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBfHtcUQUKZko0x-G_OzAAE6cpAx2rPYV0",
  authDomain: "intellitool.firebaseapp.com",
  projectId: "intellitool",
  storageBucket: "intellitool.appspot.com",
  messagingSenderId: "264174001135",
  appId: "1:264174001135:web:54ca3c92fc208476eef41a",
  measurementId: "G-VCT82KMTQW",
  databaseURL: "https://intellitool-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
