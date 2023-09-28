import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";
import {
  DataSnapshot,
  Database,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { get } from "http";
import { useNavigate } from "react-router-dom";
import { Item } from "./ToDoStore";
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

//TODO deal with path and database, is path! ok??
export default class Firebase {
  path!: string;
  firebaseConfig: FirebaseConfig;
  app: FirebaseApp;
  database!: Database;
  auth: Auth;
  googleProvider: GoogleAuthProvider;
  githubProvider: GithubAuthProvider;
  constructor() {
    this.firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId:
        process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "",
    };

    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }
  setUserPath(userId: string) {
    this.path = `users/${userId}`;
    this.database = getDatabase(this.app);
  }
  getAuth() {
    return this.auth;
  }
  getGoogleProvider() {
    return this.googleProvider;
  }
  getGithubProvider() {
    return this.githubProvider;
  }
  getDbRef() {
    return ref(this.database, this.path);
  }
  //get initial state and listen for changes
  onDbValue(callback: (snapshot: DataSnapshot) => void) {
    const ref = this.getDbRef();
    onValue(ref, callback);
  }

  clearDb() {
    const ref = this.getDbRef();
    set(ref, null);
  }

  setDbItemValue(item: Item) {
    const itemRef = ref(this.database, `${this.path}/${item.id}`);
    set(itemRef, item);
  }
  //ToDo update change not item
  updateItemValue(item: Item) {
    const itemRef = ref(this.database, `${this.path}/${item.id}`);
    update(itemRef, item);
  }
  removeItemValue(item: Item) {
    const itemRef = ref(this.database, `${this.path}/${item.id}`);
    remove(itemRef);
  }

  async signUpWithEmail(email: string, password: string): Promise<void> {
    console.log(
      `Firebase.signUpWithEmail(email: ${email}, password: ${password})`
    );
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error("Error signing up with email and password:", error);
      throw error;
    }
  }
  async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      throw error;
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }
  async loginWithGoogle(): Promise<void> {
    console.log("Signin with Google");
    try {
      signInWithRedirect(this.getAuth(), this.getGoogleProvider());
    } catch (error) {}
  }
  async loginWithGithub(): Promise<void> {
    console.log("Signin with Github");
    try {
      signInWithRedirect(this.getAuth(), this.getGithubProvider());
    } catch (error) {}
  }
  logout = async () => {
    await signOut(this.auth);
  };
  //TODO password reset
}
