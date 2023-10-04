// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc1cI9b6qAM0n3rpNndv4GmXE1woyMe-8",
  authDomain: "todolist-18f1f.firebaseapp.com",
  databaseURL: "https://todolist-18f1f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-18f1f",
  storageBucket: "todolist-18f1f.appspot.com",
  messagingSenderId: "103499212103",
  appId: "1:103499212103:web:8063b90bfe20eb1ee21862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };

// Add database key for todo's and users
export const TODOS_REF = '/todos/';
export const USERS_REF = '/users/';