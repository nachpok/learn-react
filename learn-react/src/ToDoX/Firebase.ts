// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD55ueen4mvqc79_3uAhAvrXavUxeuGaG8",
  authDomain: "todo-9d7e3.firebaseapp.com",
  projectId: "todo-9d7e3",
  storageBucket: "todo-9d7e3.appspot.com",
  messagingSenderId: "334618321060",
  appId: "1:334618321060:web:b9962da1162fd635e28631",
  measurementId: "G-125X9W4B0W",
};
import { getStorage, ref } from "firebase/storage";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage();
const storageRef = ref(storage);
export class Firebase {}
