import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA22C3gE14wegzVpDHh-SvudFfeOBE5A4w",
  authDomain: "umaps-d0db7.firebaseapp.com",
  projectId: "umaps-d0db7",
  storageBucket: "umaps-d0db7.firebasestorage.app",
  messagingSenderId: "901754908957",
  appId: "1:901754908957:web:47dcf7e58718a37aefb1f4",
  measurementId: "G-6701BYDSPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);