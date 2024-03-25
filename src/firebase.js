import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/app";
import "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyApOYXLJ1jFQVu_g_qlJJLBV2mr88InXgA",
  authDomain: "gars9n-080523.firebaseapp.com",
  projectId: "gars9n-080523",
  storageBucket: "gars9n-080523.appspot.com",
  messagingSenderId: "442460433343",
  appId: "1:442460433343:web:91280b7fed3939e7e24f0a",
  measurementId: "G-6V81GWF6Z7",
};

const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = getStorage(app)
