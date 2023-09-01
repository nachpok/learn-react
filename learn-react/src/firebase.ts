import { initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD55ueen4mvqc79_3uAhAvrXavUxeuGaG8",
  authDomain: "todo-9d7e3.firebaseapp.com",
  projectId: "todo-9d7e3",
  storageBucket: "todo-9d7e3.appspot.com",
  messagingSenderId: "334618321060",
  appId: "1:334618321060:web:b9962da1162fd635e28631",
  measurementId: "G-125X9W4B0W",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
